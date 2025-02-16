package com.berezovskoye.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.stream.Stream;

@Slf4j
@Service
public class PdfService {
    @Value("${pdfs.path}")
    private String pdfPath;

    @Value("${fonts.path}")
    private String fontsPath;
//    @Deprecated
//    public ResponseEntity<FileSystemResource> downloadPdf(String filename) {
//        File file = new File(pdfPath, filename);
//        if (!file.exists()) {
//            //todo log
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
//
//        return ResponseEntity.ok()
//                .headers(headers)
//                .body(new FileSystemResource(file));
//    }

    @Cacheable(value = "pdf", key = "#productId")
    public ResponseEntity<byte[]> downloadPdf(int productId){
        //TODO get product from repo to update data OR add another method of getting exact product
        byte[] pdfBytes = generatePdf();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/pdf");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=document.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    private byte[] generatePdf() {
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            BaseFont baseFont = BaseFont.createFont(fontsPath + "/TimesNewRoman.ttf", "cp1251", BaseFont.EMBEDDED);
            Font normalFont = new Font(baseFont, 10);

            Paragraph paragraph = new Paragraph("Привет", normalFont);
            document.add(paragraph);

            PdfPTable table = new PdfPTable(3);
            addTableHeader(table, normalFont);
            addRows(table, normalFont);

            document.add(table);
            document.close();

            return outputStream.toByteArray();
        } catch (DocumentException | IOException e) {
            e.printStackTrace();
            throw new RuntimeException("PDF не был сгенерирован!");
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void addTableHeader(PdfPTable table, Font headerFont) {
        Stream.of("Заголовок колонки 1", "Заголовок колонки 2", "Заголовок колонки 3")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle, headerFont));
                    table.addCell(header);
                });
    }

    private void addRows(PdfPTable table, Font rowFont) {
        table.addCell(new Phrase("ряд 1, кол 1", rowFont));
        table.addCell(new Phrase("ряд 1, кол 2", rowFont));
        table.addCell(new Phrase("ряд 1, кол 3", rowFont));
    }
}
