package com.urlshortener.api.service;

import com.urlshortener.api.dto.UrlCreateRequest;
import com.urlshortener.api.dto.UrlStatsResponse;
import com.urlshortener.api.entity.UrlMapping;
import com.urlshortener.api.exception.UrlNotFoundException;
import com.urlshortener.api.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UrlServiceImpl implements UrlService {
    private final UrlRepository urlRepository;

    @Override
    public UrlMapping createShortUrl(UrlCreateRequest request) {
        String shortCode;
        do {
            shortCode = RandomStringUtils.randomAlphanumeric(7);
        } while (urlRepository.findByShortCode(shortCode).isPresent());
        UrlMapping urlMapping = new UrlMapping(request.getOriginalUrl(), shortCode);
        return urlRepository.save(urlMapping);
    }

    @Override
    public UrlMapping getOriginalUrl(String shortCode) {
        UrlMapping urlMapping = getUrlMapping(shortCode);
        urlMapping.setAccessCount(urlMapping.getAccessCount() + 1);
        return urlRepository.save(urlMapping);
    }

    @Override
    public UrlStatsResponse getStats(String shortCode) {
        UrlMapping urlMapping = getUrlMapping(shortCode);
        UrlStatsResponse statsResponse = new UrlStatsResponse();
        statsResponse.setOriginalUrl(urlMapping.getOriginalUrl());
        statsResponse.setShortCode(urlMapping.getShortCode());
        statsResponse.setAccessCount(urlMapping.getAccessCount());
        return statsResponse;
    }

    @Override
    public void deleteUrl(String shortCode) {
        UrlMapping urlMapping = getUrlMapping(shortCode);
        urlRepository.delete(urlMapping);
    }

    private UrlMapping getUrlMapping(String shortCode){
        return urlRepository.findByShortCode(shortCode).orElseThrow(()->new UrlNotFoundException("URL not found for short code: " + shortCode));
    }
}
