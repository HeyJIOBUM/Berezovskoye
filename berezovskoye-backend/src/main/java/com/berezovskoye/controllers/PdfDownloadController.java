package com.berezovskoye.controllers;

import com.berezovskoye.services.PdfDownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

@RestController
@RequestMapping("/pdf")
public class PdfDownloadController {
    @Autowired
    private PdfDownloadService pdfDownloadService;

    @GetMapping("/{filename:.+}")
    public ResponseEntity<FileSystemResource> downloadPdf(@PathVariable String filename) {
        return pdfDownloadService.downloadPdf(filename);
    }
}
