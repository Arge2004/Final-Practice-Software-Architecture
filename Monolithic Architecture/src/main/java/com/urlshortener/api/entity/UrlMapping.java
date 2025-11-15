package com.urlshortener.api.entity;

import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import lombok.Data;
@Data
@NoArgsConstructor
@Document(collection = "url_mapping")
public class UrlMapping {
    public UrlMapping(String originalUrl, String shortCode) {
        this.originalUrl = originalUrl;
        this.shortCode = shortCode;
        this.creationDate = LocalDateTime.now();
        this.accessCount = 0L;
    }

    @Id
    private String id;

    @Field("short_code")
    @Indexed(unique = true)
    private String shortCode;

    @Field("original_url")
    private String originalUrl;

    @Field("creation_date")
    private LocalDateTime creationDate;

    @Field("access_count")
    private Long accessCount;
}
