package com.berezovskoye.controllers;

import com.berezovskoye.services.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pdf")
public class PdfController {
    @Autowired
    private PdfService pdfService;

    @GetMapping("/{filename:.+}")
    public ResponseEntity<FileSystemResource> downloadPdf(@PathVariable String filename) {
        return pdfService.downloadPdf(filename);
    }
}
