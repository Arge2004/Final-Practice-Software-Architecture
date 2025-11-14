package com.urlshortener.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@NoArgsConstructor
public class UrlCreateRequest {
    @Schema(description = "La URL original que se desea acortar.",
            example = "https://www.google.com/search?q=spring+boot",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "The URL cannot be empty.")
    @URL(message = "A valid URL format is required.")
    private String originalUrl;
}
