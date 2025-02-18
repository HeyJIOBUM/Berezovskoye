package com.berezovskoye.services;

import com.berezovskoye.models.product.CategoryDetails;
import com.berezovskoye.models.product.Product;
import com.berezovskoye.models.product.ProductDetailsCategory;
import com.berezovskoye.models.product.ProductDetailsTable;
import com.berezovskoye.repositories.ProductRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.stream.Stream;

@Slf4j
@Service
public class PdfService {
    @Value("${fonts.path}")
    private String fontsPath;

    @Value("${pdf.password}")
    private String pdfPassword;

    private String title = "Цены на продукцию ТПУ \"Березовское\" УП \"Брестоблгаз\"";
    private String addressLine1 = "225260, Брестская область, Ивацевичский р-н";
    private String addressLine2 = "пос. Зеленый Бор, ул. Центральная, 5";
    private String phoneNumbers = "тел. ПЭС +375 1645 47 2 18, Сектор МТОиМ +375 1645 47 2 33";
    private String webSources = "www.torf.brest.gas.by, e-mail: torf@brest.gas.by, tbz@brest.gas.by";


    @Autowired
    private ProductRepository productRepository;

    @Cacheable(value = "pdf", key = "#productId")
    public ResponseEntity<byte[]> downloadPdf(int productId){

        Optional<Product> desiredProduct = productRepository.findById(productId);
        if(desiredProduct.isEmpty()){
            //TODO handle + logs
        }

        Product currentProduct = desiredProduct.get();
        byte[] pdfBytes = generatePdf(currentProduct.getProductDetailsTable());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/pdf");
        String filename = currentProduct.getName();

        try {
            String encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFilename + "\".pdf");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace(); //TODO handle + log
        }

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

//    private ProductDetailsTable hardcodeProdDetails() {
//
//        ProductDetailsTable pdt = new ProductDetailsTable();
//
//        pdt.setHeader(List.of("Показатели качества", "Ед.изм", "Отпускная цена без НДС", "НДС 20%", "Отпускная цена с НДС"));
//
//        ProductDetailsCategory pdc = new ProductDetailsCategory();
//        pdc.setCategoryName("Дрова (береза, ольха, сосна, ель, дуб), длиной до 4-х метров, " +
//                "реализуемые на условиях поставки франко-верхний лесопромышленный склад");
//
//        CategoryDetails cd = new CategoryDetails();
//        cd.setCategoryDetails(List.of("юридическим лицам, индивидуальным предпринимателям",
//                "1 пл.м³",
//                "19,61 руб.",
//                "3,92 руб.",
//                "23,53 руб."));
//
//        pdc.setCategoryDetails(List.of(cd, cd));
//
//        pdt.setProductDetailsCategories(List.of(pdc, pdc));
//
//        return pdt;
//    }

    private byte[] generatePdf(ProductDetailsTable detailsTable) {
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            writer.setEncryption(
                    null,
                    pdfPassword.getBytes(),
                    PdfWriter.ALLOW_PRINTING | PdfWriter.ALLOW_COPY,
                    PdfWriter.ENCRYPTION_AES_128
            );
            document.open();

            BaseFont baseFont = BaseFont.createFont(fontsPath + "/TimesNewRoman.ttf", "cp1251", BaseFont.EMBEDDED);
            Font headerFont = new Font(baseFont, 10, Font.BOLD);
            Font regularFont = new Font(baseFont, 8);
            Font subHeaderFont = new Font(baseFont, 8, Font.BOLD | Font.ITALIC);
            Font titleFont = new Font(baseFont, 14, Font.BOLD);
            Font credentialsFont = new Font(baseFont, 10, Font.BOLD);

            Paragraph titleParagraph = createDocumentTitle(titleFont);
            document.add(titleParagraph);

            PdfPTable table = createTable(detailsTable, headerFont, regularFont, subHeaderFont);
            document.add(table);

            addContactInfo(document, credentialsFont);

            document.close();
            return outputStream.toByteArray();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
            throw new RuntimeException("PDF не был сгенерирован!"); // TODO: custom exception handler + logs
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private Paragraph createDocumentTitle(Font titleFont) {
        Paragraph titleParagraph = new Paragraph(title, titleFont);
        titleParagraph.setAlignment(Element.ALIGN_CENTER);
        titleParagraph.setSpacingAfter(30);
        return titleParagraph;
    }

    private void addContactInfo(Document document, Font centerFont) throws DocumentException {
        Paragraph addressParagraph1 = new Paragraph(addressLine1, centerFont);
        addressParagraph1.setAlignment(Element.ALIGN_CENTER);

        Paragraph addressParagraph2 = new Paragraph(addressLine2, centerFont);
        addressParagraph2.setAlignment(Element.ALIGN_CENTER);

        Paragraph numbersParagraph = new Paragraph(phoneNumbers, centerFont);
        numbersParagraph.setAlignment(Element.ALIGN_CENTER);

        Paragraph webSourcesParagraph = new Paragraph(webSources, centerFont);
        webSourcesParagraph.setAlignment(Element.ALIGN_CENTER);

        document.add(addressParagraph1);
        document.add(addressParagraph2);
        document.add(numbersParagraph);
        document.add(webSourcesParagraph);
    }

    private PdfPTable createTable(ProductDetailsTable detailsTable, Font headerFont, Font regularFont, Font subHeaderFont) {
        PdfPTable table = new PdfPTable(detailsTable.getHeader().size());

        // setting custom width of the first column
        float[] columnWidths = new float[detailsTable.getHeader().size()];
        columnWidths[0] = 3f;
        for (int i = 1; i < columnWidths.length; i++) {
            columnWidths[i] = 1f;
        }
        try {
            table.setWidths(columnWidths);
        } catch (DocumentException e) {
            throw new RuntimeException(e);
        }

        addTableHeaders(table, detailsTable.getHeader(), headerFont);

        for (ProductDetailsCategory category : detailsTable.getProductDetailsCategories()) {
            addCategoryToTable(table, category, subHeaderFont, regularFont, detailsTable.getHeader().size());
        }

        return table;
    }

    private void addTableHeaders(PdfPTable table, List<String> headers, Font headerFont) {
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setBackgroundColor(new BaseColor(220, 220, 220));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }
    }

    private void addCategoryToTable(PdfPTable table, ProductDetailsCategory category, Font subHeaderFont, Font normalFont, int headerSize) {
        // subtitle
        PdfPCell subHeaderCell = new PdfPCell(new Phrase(category.getCategoryName(), subHeaderFont));
        subHeaderCell.setColspan(headerSize);
        subHeaderCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.addCell(subHeaderCell);

        // adding categories
        for (CategoryDetails categoryDetail : category.getCategoryDetails()) {
            List<String> details = categoryDetail.getDetails();

            // modifying first column values
            String firstCellValue = " - " + (details.size() > 0 ? details.get(0) : "");
            table.addCell(new Phrase(firstCellValue, normalFont));

            // limiting row length with amount of headers
            for (int i = 1; i < headerSize; i++) {
                String value = (i < details.size()) ? details.get(i) : "";
                table.addCell(new Phrase(value, normalFont));
            }
        }
    }
}
