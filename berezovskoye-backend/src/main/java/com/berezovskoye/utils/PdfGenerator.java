package com.berezovskoye.utils;

import com.berezovskoye.models.product.CategoryDetails;
import com.berezovskoye.models.product.ProductDetailsCategory;
import com.berezovskoye.models.product.ProductDetailsTable;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;

@Component
public class PdfGenerator {
    public final static String FILE_TYPE = ".pdf";

    private static String pdfPassword;
    private static String fontsPath;

    @Value("${pdf.password}")
    private String injectedPdfPassword;

    @Value("${fonts.path}")
    private String injectedFontsPath;

    private final static String title = "Цены на продукцию ТПУ \"Березовское\" УП \"Брестоблгаз\"";
    private final static String addressLine1 = "225260, Брестская область, Ивацевичский р-н";
    private final static String addressLine2 = "пос. Зеленый Бор, ул. Центральная, 5";
    private final static String phoneNumbers = "тел. ПЭС +375 1645 47 2 18, Сектор МТОиМ +375 1645 47 2 33";
    private final static String webSources = "www.torf.brest.gas.by, e-mail: torf@brest.gas.by, tbz@brest.gas.by";

    private final static int[] BG_COLOR = {220, 220, 220};

    private final static int HEADER_FONT_SIZE = 10;
    private final static int REGULAR_FONT_SIZE = 8;
    private final static int SUB_HEADER_FONT_SIZE = 8;
    private final static int TITLE_FONT_SIZE = 14;
    private final static int CREDENTIALS_FONT_SIZE = 10;

    private final static int SPACING_AFTER_TITLE = 30;

    private final static float FIRST_COL_LENGTH = 3f;
    private final static float OTHER_COL_LENGTH = 1f;

    @PostConstruct
    public void init() {
        pdfPassword = injectedPdfPassword;
        fontsPath = injectedFontsPath;
    }

    public static byte[] generatePdf(ProductDetailsTable detailsTable) throws RuntimeException {
        Document document = new Document();

        try(ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            writer.setEncryption(
                    null,
                    pdfPassword.getBytes(),
                    PdfWriter.ALLOW_PRINTING | PdfWriter.ALLOW_COPY,
                    PdfWriter.ENCRYPTION_AES_128
            );
            document.open();

            BaseFont baseFont = BaseFont.createFont(fontsPath + "/TimesNewRoman.ttf", "cp1251", BaseFont.EMBEDDED);
            Font headerFont = new Font(baseFont, HEADER_FONT_SIZE, Font.BOLD);
            Font regularFont = new Font(baseFont, REGULAR_FONT_SIZE);
            Font subHeaderFont = new Font(baseFont, SUB_HEADER_FONT_SIZE, Font.BOLD | Font.ITALIC);
            Font titleFont = new Font(baseFont, TITLE_FONT_SIZE, Font.BOLD);
            Font credentialsFont = new Font(baseFont, CREDENTIALS_FONT_SIZE, Font.BOLD);

            Paragraph titleParagraph = createDocumentTitle(titleFont);
            document.add(titleParagraph);

            PdfPTable table = createTable(detailsTable, headerFont, regularFont, subHeaderFont);
            document.add(table);

            addContactInfo(document, credentialsFont);

            document.close();
            return outputStream.toByteArray();
        } catch (DocumentException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static Paragraph createDocumentTitle(Font titleFont) {
        Paragraph titleParagraph = new Paragraph(title, titleFont);
        titleParagraph.setAlignment(Element.ALIGN_CENTER);
        titleParagraph.setSpacingAfter(SPACING_AFTER_TITLE);
        return titleParagraph;
    }

    private static void addContactInfo(Document document, Font centerFont) throws DocumentException {
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

    private static PdfPTable createTable(ProductDetailsTable detailsTable, Font headerFont, Font regularFont, Font subHeaderFont) {
        PdfPTable table = new PdfPTable(detailsTable.getHeader().size());

        // setting custom width of the first column
        float[] columnWidths = new float[detailsTable.getHeader().size()];
        columnWidths[0] = FIRST_COL_LENGTH;
        for (int i = 1; i < columnWidths.length; i++) {
            columnWidths[i] = OTHER_COL_LENGTH;
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

    private static void addTableHeaders(PdfPTable table, java.util.List<String> headers, Font headerFont) {
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setBackgroundColor(new BaseColor(BG_COLOR[0], BG_COLOR[1], BG_COLOR[2]));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
        }
    }

    private static void addCategoryToTable(PdfPTable table, ProductDetailsCategory category, Font subHeaderFont, Font normalFont, int headerSize) {
        // subtitle
        PdfPCell subHeaderCell = new PdfPCell(new Phrase(category.getCategoryName(), subHeaderFont));
        subHeaderCell.setColspan(headerSize);
        subHeaderCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.addCell(subHeaderCell);

        // adding categories
        for (CategoryDetails categoryDetail : category.getCategoryDetails()) {
            List<String> details = categoryDetail.getDetails();

            // modifying first column values
            String firstCellValue = " - " + (!details.isEmpty() ? details.getFirst() : "");
            table.addCell(new Phrase(firstCellValue, normalFont));

            // limiting row length with amount of headers
            for (int i = 1; i < headerSize; i++) {
                String value = (i < details.size()) ? details.get(i) : "";
                table.addCell(new Phrase(value, normalFont));
            }
        }
    }
}
