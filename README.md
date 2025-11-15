# Taller - Arquitectura y Despliegue en la Nube

## 📋 Descripción General

Proyecto académico que demuestra diferentes arquitecturas de software desplegadas en AWS, aplicando principios de diseño, patrones arquitectónicos y buenas prácticas de ingeniería de software.

**Sistema desarrollado:** Acortador de URLs (URL Shortener)

**Objetivo:** Comparar arquitecturas monolíticas, distribuidas y serverless mediante implementaciones prácticas del mismo sistema.

## 🎯 Objetivos del Taller

1. Modelar y desplegar un microservicio en la nube
2. Comparar arquitecturas monolíticas vs distribuidas
3. Implementar servicios web con arquitectura serverless
4. Aplicar principios SOLID y DRY
5. Gestionar código con Git Flow y versionamiento semántico

## 🏗️ Arquitecturas Implementadas

### [Punto 1: Modelado y Despliegue Inicial](./Modeling%20and%20Initial%20Deployment/)
**Microservicio tradicional en EC2**

- Spring Boot + Java 21
- MongoDB Atlas
- Deploy en EC2 con systemd
- Diagramas UML (clases y componentes)

**📊 Tecnologías:** Spring Boot, Java, MongoDB, AWS EC2

[Ver documentación completa →](./Modeling%20and%20Initial%20Deployment/README.md)

---

### [Punto 2a: Arquitectura Monolítica](./Monolithic%20Architecture/)
**Backend + Frontend en un solo servidor**

- Aplicación unificada (Spring Boot sirve frontend estático)
- Todo en una instancia EC2
- Despliegue simple, escalado vertical

**📊 Ventajas:** Simple, bajo costo, sin CORS  
**📊 Desventajas:** Punto único de fallo, escalado limitado

[Ver documentación completa →](./Monolithic%20Architecture/README.md)

---

### [Punto 2b: Arquitectura Distribuida](./Static%20Application/)
**Frontend y Backend separados**

- Frontend: React SPA en S3 + CloudFront (CDN global)
- Backend: Spring Boot API en EC2
- Componentes independientes y escalables

**📊 Ventajas:** CDN, escalado independiente, resiliencia  
**📊 Desventajas:** Mayor complejidad, latencia de red

[Ver documentación completa →](./Static%20Application/README.md)

---

### [Punto 3: Arquitectura Serverless](./API%20Gateway%20+%20Lambdas/)
**Sin servidores - Lambda + API Gateway**

- AWS Lambda (Node.js) para lógica de negocio
- API Gateway como puerta de entrada HTTP
- Escalado automático, pago por uso
- MongoDB Atlas compartida

**📊 Ventajas:** Cero gestión, escalado automático, bajo costo  
**📊 Desventajas:** Cold starts, límites de ejecución

[Ver documentación completa →](./API%20Gateway%20+%20Lambdas/README.md)

---

## 📊 Comparativa de Arquitecturas

| Aspecto | Punto 1<br>Microservicio | Punto 2a<br>Monolítica | Punto 2b<br>Distribuida | Punto 3<br>Serverless |
|---------|--------------------------|------------------------|-------------------------|----------------------|
| **Deploy** | EC2 manual | EC2 unificado | S3+CloudFront+EC2 | Lambda+API Gateway |
| **Escalado** | Manual | Vertical | Horizontal independiente | Automático infinito |
| **Costo/mes** | ~$8.50 | ~$12 | ~$15-20 | ~$0.50-5 (variable) |
| **Complejidad** | Baja | Baja | Media-Alta | Media |
| **Mantenimiento** | Alto | Alto | Medio | Bajo |
| **Latencia** | Baja | Baja | Media (CDN mejora frontend) | Media (cold starts) |
| **Disponibilidad** | 1 AZ | 1 AZ | Multi-región (CloudFront) | Multi-AZ (automático) |
| **Mejor para** | MVP, aprendizaje | Apps pequeñas | Producción media | Apps con tráfico variable |

## 🛠️ Stack Tecnológico

### Backend
- **Java 21** con Spring Boot 
- **Node.js** (Lambda functions)
- **MongoDB Atlas** (base de datos compartida)
- **Maven** para gestión de dependencias

### Frontend
- **React 18** con Vite
- **HTML5, CSS3, JavaScript** (versión monolítica)

### Infraestructura AWS
- **EC2** (t3.micro) - Compute
- **S3** - Storage estático
- **CloudFront** - CDN
- **Lambda** - Serverless compute
- **API Gateway** - HTTP endpoints


### Herramientas
- **Git** + **GitHub** - Control de versiones
- **Draw.io** - Diagramas UML
- **Postman** - Testing de APIs y Documentación


## 🎓 Principios Aplicados

### SOLID

**Single Responsibility Principle**
- Cada clase tiene una única responsabilidad
- Controllers solo manejan HTTP
- Services contienen lógica de negocio
- Repositories acceden a datos

**Dependency Inversion**
- Inyección de dependencias con Spring
- Interfaces para repositorios
- Desacoplamiento de implementaciones

### DRY (Don't Repeat Yourself)
- DTOs reutilizables
- Lógica común en capa de servicio
- Utilidades compartidas


## 🔄 Git Flow y Versionamiento

### Estrategia de Branching
```
main (producción)
  └── develop (integración)
      ├── feature/point1-initial-deployment
      ├── feature/point2a-monolithic-architecture
      ├── feature/punto2b-static-application
      └── feature/punto-3-api-gateway-lambda
```


## 🚀 Despliegues en Producción

### URLs de los Sistemas

| Sistema | URL | Estado |
|---------|-----|--------|
| Microservicio (P1) | `http://13.58.106.198` | ✅ Activo |
| Monolítica (P2a) | `http://52.15.199.98/` | ✅ Activo |
| Distribuida (P2b) | `https://d32ixjcppli3yd.cloudfront.net/` | ✅ Activo |
| Serverless (P3) | `https://[api-gateway-id].execute-api.us-east-2.amazonaws.com/prod` | ✅ Activo |

## 📸 Evidencias

Capturas de pantalla y videos demostrativos en carpeta `Docs/Screenshots`:

- Aplicaciones funcionando
- Configuraciones AWS
- Diagramas UML
- Logs de sistema

## 🎯 Resultados y Aprendizajes

### Conocimientos Adquiridos

✅ Diseño y modelado de arquitecturas cloud  
✅ Despliegue en múltiples servicios AWS  
✅ Comparación práctica de patrones arquitectónicos  
✅ Implementación de APIs RESTful  
✅ Aplicación de principios de diseño SOLID/DRY  
✅ Git Flow y gestión de repositorios  
✅ Documentación técnica completa  



## 👤 Autor

**Argenis Medina Morales**
- GitHub: [Arge2004](https://github.com/Arge2004)
- Email: argenis.medina@udea.edu.co

## 📅 Información del Proyecto

- **Universidad:** Universidad de Antioquia
- **Materia:** Arquitectura de Software
- **Fecha:** Noviembre 2025

## 📄 Licencia

Este proyecto es de carácter académico.

---

⭐ **Si este proyecto te fue útil, dale una estrella en GitHub**