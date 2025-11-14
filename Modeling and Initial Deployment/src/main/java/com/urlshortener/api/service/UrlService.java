package com.urlshortener.api.service;

import com.urlshortener.api.dto.UrlCreateRequest;
import com.urlshortener.api.dto.UrlStatsResponse;
import com.urlshortener.api.entity.UrlMapping;
import org.springframework.stereotype.Service;

public interface UrlService {
    /**
     * Crea un nuevo short code para la URL original proporcionada.
     * @param request El DTO con la URL original.
     * @return El objeto UrlMapping que fue guardado.
     */
    UrlMapping createShortUrl(UrlCreateRequest request);

    /**
     * Obtiene la URL original para un short code y registra el acceso.
     * @param shortCode El código corto.
     * @return El objeto UrlMapping correspondiente.
     */
    UrlMapping getOriginalUrl(String shortCode);

    /**
     * Obtiene las estadísticas de un short code sin registrar un nuevo acceso.
     * @param shortCode El código corto.
     * @return El DTO con las estadísticas.
     */
    UrlStatsResponse getStats(String shortCode);

    /**
     * Elimina un mapeo de URL.
     * @param shortCode El código corto a eliminar.
     */
    void deleteUrl(String shortCode);
}

