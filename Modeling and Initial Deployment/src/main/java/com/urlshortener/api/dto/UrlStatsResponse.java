package com.urlshortener.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UrlStatsResponse {
    @Schema(description = "La URL original.",
            example = "https://www.google.com/search?q=spring+boot")
    private String originalUrl;

    @Schema(description = "El código corto de 7 caracteres generado.",
            example = "aB1cD2e")
    private String shortCode;

    @Schema(description = "El número de veces que se ha accedido a la URL corta.",
            example = "42")
    private Long accessCount;
}
