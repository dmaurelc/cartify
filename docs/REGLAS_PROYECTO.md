# 📋 Reglas del Proyecto PDR

## Idioma y Comunicación

- ✅ **Responder siempre en español**, incluso si se pregunta en otro idioma
- ✅ Solo usar otros idiomas para:
  - Nombres de archivos
  - Nombres de funciones y variables
  - Nombres de clases
  - Constantes técnicas
  - Comentarios de código (pueden ser en inglés)

## Estándar de Código

### Límite de Líneas por Archivo
- **Máximo 1,000 líneas** por archivo
- Solo excepcionalmente si es **extremadamente necesario**
- Preferencia por archivos pequeños y enfocados (<500 líneas)

### Estructura
- Un servicio/componente por archivo
- Funciones pequeñas y enfocadas (<50 líneas)
- Máximo 2-3 niveles de anidación

## Gestión de Git

- ❌ **No realizar commits sin petición explícita**
- ❌ **No hacer push sin petición explícita**
- ✅ Esperar instrucción antes de guardar cambios
- ✅ Aviso previo si hay cambios sin commitear

## Commits

- ✅ Mensajes claros en español
- ✅ Formato: `tipo: descripción`
  - `feat: agregar funcionalidad X`
  - `fix: corregir bug en X`
  - `refactor: reorganizar módulo X`
  - `docs: actualizar documentación`
  - `test: agregar tests para X`
  - `chore: actualizar dependencias`

- ❌ **No mencionar a Claude Code** como colaborador
- ❌ No usar nombres genéricos: "cambios varios", "updates", etc.

## Documentación

- ✅ Toda documentación en **español**
- ✅ Comentarios en código **preferiblemente en español**
- ✅ README, CHANGELOG y PRs en español
- ✅ Mantener documentación sincronizada con código

## Archivos y Directorios

### Nombres de Archivos
- Usar kebab-case: `archivo-nombre.ts`
- Componentes React: PascalCase: `MiComponente.tsx`
- Tests: `archivo.test.ts`, `archivo.spec.ts`

### Estructura Recomendada
```
src/
├── app/              # Rutas/Páginas (Next.js)
├── components/       # Componentes React
├── hooks/           # Custom Hooks
├── services/        # Servicios API
├── utils/           # Utilidades
├── types/           # Tipos TypeScript
├── constants/       # Constantes
└── styles/          # Estilos globales
```

## Versionado Semántico (Explicado en archivo separado)

Ver: `VERSIONADO_SEMANTICO.md`

## Checklist Pre-Commit

Antes de cualquier commit, verificar:

- [ ] Código compila sin errores
- [ ] Linter pasa (ESLint)
- [ ] Formato correcto (Prettier)
- [ ] Tests pasan (si hay)
- [ ] No hay console.log en producción
- [ ] Mensaje de commit en español
- [ ] Documentación actualizada

## Configuración del Editor

### VSCode
```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

### Extensiones Recomendadas
- ESLint
- Prettier - Code formatter
- Thunder Client (o Postman)
- Prisma
- Tailwind CSS IntelliSense

## Workflow Típico

1. **Desarrollo**
   - Crear rama desde `develop`
   - Hacer cambios en archivos
   - Testear localmente

2. **Preparación**
   - Verificar checklist pre-commit
   - Ejecutar linter y formatter
   - Ejecutar tests

3. **Solicitud**
   - Informar sobre cambios completados
   - Esperar instrucción de commit
   - Esperar instrucción de push

4. **Commit & Push** (solo si se solicita)
   - Mensaje claro en español
   - Verificar que todo está bien
   - Push a rama

## Versiones y Releases

- **v0.x.x** = MVP (fases 1-3)
- **v1.0.0** = Primera versión estable
- Ver `VERSIONADO_SEMANTICO.md` para detalles completos

## Preguntas y Decisiones

- Preguntar siempre antes de cambios arquitectónicos
- Preguntar antes de agregar nuevas dependencias
- Preguntar antes de romper cambios
- Informar sobre decisiones técnicas significativas

## Ejemplos

### ✅ Correcto
```bash
git commit -m "feat: agregar autenticación con JWT"
git commit -m "fix: corregir validación de email en formulario"
git commit -m "refactor: reorganizar módulo de autenticación"
```

### ❌ Incorrecto
```bash
git commit -m "cambios varios"
git commit -m "update"
git commit -m "Generated with Claude Code"
git commit -m "agregar cosas"
```

## Contacto y Dudas

Si hay dudas sobre estas reglas:
- Preguntar explícitamente
- Esperar confirmación antes de proceder
- Verificar documentación relevante

---

**Versión:** 1.0
**Creado:** 2025-12-25
**Última Actualización:** 2025-12-25
