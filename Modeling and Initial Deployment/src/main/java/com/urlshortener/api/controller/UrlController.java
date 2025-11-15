package com.urlshortener.api.controller;

import com.urlshortener.api.dto.UrlCreateRequest;
import com.urlshortener.api.dto.UrlStatsResponse;
import com.urlshortener.api.entity.UrlMapping;
import com.urlshortener.api.service.UrlService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@Tag(name = "Operaciones de URLs", description = "Endpoints para crear, redirigir, y gestionar URLs cortas.")
public class UrlController {

    @Value("${app.base-url}")
    private String shortUrlBase;

    private final UrlService urlService;

    @PostMapping("/api/urls")
    public ResponseEntity<String> createShortUrl(@Valid @RequestBody UrlCreateRequest request) {
        UrlMapping newUrl = urlService.createShortUrl(request);
        String shortUrl = shortUrlBase + "/" + newUrl.getShortCode();
        return ResponseEntity.status(HttpStatus.CREATED).body(shortUrl);
    }

    @GetMapping("/{shortCode}")
    public void redirectToOriginalUrl(@PathVariable String shortCode, HttpServletResponse response) throws IOException {
        UrlMapping urlMapping = urlService.getOriginalUrl(shortCode);
        response.sendRedirect(urlMapping.getOriginalUrl());
    }

    @GetMapping("/api/urls/{shortCode}")
    public ResponseEntity<UrlStatsResponse> getUrlStats(@PathVariable String shortCode) {
        UrlStatsResponse stats = urlService.getStats(shortCode);
        return ResponseEntity.ok(stats);
    }

    @DeleteMapping("/api/urls/{shortCode}")
    public ResponseEntity<Void> deleteUrl(@PathVariable String shortCode) {
        urlService.deleteUrl(shortCode);
        return ResponseEntity.noContent().build();
    }
}
