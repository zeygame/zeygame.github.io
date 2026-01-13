### Döviz Takip Uygulaması

Bu proje, React ile API kullanımı konusunu öğrenmek için hazırlanmış basit bir **Döviz Takip Uygulaması**dır.
Amaç, `useState` ve `useEffect` hook'larını kullanarak bir REST API'den veri çekmek, bu verileri işlemek ve kullanıcıya sade bir arayüzle sunmaktır.

**Uygulama Ne Yapar?**
- Kullanıcıdan baz para birimi seçmesi istenir (USD, EUR, TRY, GBP gibi).
- Seçilen baz para birimine göre diğer paraların güncel kur oranları API'den çekilir.
- Kur değerleri tablo halinde listelenir.
- Kur artış/azalış durumuna göre dinamik renkler (yeşil/kırmızı) kullanılır.

---

### Kullanılan API

Bu projede ücretsiz ve açık kaynaklı **Frankfurter API** kullanılmıştır:

- **Dokümantasyon:** https://api.frankfurter.app
- **Örnek İstek:** `https://api.frankfurter.app/latest?from=TRY`

Projeyle kullanıcı input alanına bir para birimi (Örn: USD) girdiğinde, bu değer dinamik olarak API adresine eklenir (`from=USD`) ve veriler buna göre güncellenir.

---

### Projenin Kurulumu ve Çalıştırılması

1. Bu klasörü bilgisayarına indir veya kopyala.
2. Terminal / PowerShell ile proje klasörüne gir:
   ```bash
   cd "final ödevi"