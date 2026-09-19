# 🔐 GUIA COMPLETO DE CONFIGURAÇÃO EAS

## 📋 O QUE É NECESSÁRIO

### 1. **Token EAS** (não é o número do app.js)
- Gerado em: https://expo.dev/settings/access-tokens
- Formato: `ey...` (começa com "ey")
- Nunca expira (a menos que você revogue)

### 2. **Project ID** (diferente do token)
- Encontrado em: `eas.json` → `projectId`
- Formato: UUID (ex: `12345678-1234-1234-1234-123456789012`)
- Criado quando você faz `eas init`

### 3. **Account Name** (seu usuário Expo)
- Seu nome de usuário no Expo
- Encontrado em: https://expo.dev/settings

### 4. **App ID** (Android Package Name)
- Encontrado em: `app.json` → `android.package`
- Formato: `com.example.app` (reverse domain notation)

### 5. **Keystore** (chave de assinatura)
- Arquivo `.jks` ou `.keystore`
- Gerado uma vez, reutilizado sempre
- **NUNCA deve ser compartilhado**

---

## 🔍 ONDE ENCONTRAR CADA COISA

### **eas.json**
```json
{
  "cli": { "version": ">= 5.0.0" },
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "projectId": "AQUI_ESTÁ_O_PROJECT_ID"  ← UUID único
}
