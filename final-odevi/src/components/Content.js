import React, { useEffect, useState } from "react";

function Content() {
  const [bazDoviz, setBazDoviz] = useState("TRY");
  const [kurlar, setKurlar] = useState(null);
  const [oncekiKurlar, setOncekiKurlar] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  // ilk açılışta TRY kurlarını çek
  useEffect(() => {
    kurlariGetir("TRY");
  }, []);

  // API'den veri çekiyoruz
  const kurlariGetir = async (baz) => {
    setYukleniyor(true);
    setHata("");

    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${baz}`
      );

      if (!response.ok) {
        throw new Error("API hatası");
      }

      const data = await response.json();

      // sadece istediğimiz para birimlerini al
      let kurlarObj = {};
      if (data.rates.USD) kurlarObj.USD = data.rates.USD;
      if (data.rates.EUR) kurlarObj.EUR = data.rates.EUR;
      if (data.rates.GBP) kurlarObj.GBP = data.rates.GBP;
      if (data.rates.TRY) kurlarObj.TRY = data.rates.TRY;

      // önceki kurları sakla (karşılaştırma için)
      setOncekiKurlar(kurlar);

      setKurlar({
        base: data.base,
        date: data.date,
        values: kurlarObj
      });
      setYukleniyor(false);
    } catch (err) {
      console.error("Hata:", err);
      setHata("Veri gelmedi. Para birimini kontrol et ve internet bağlantını kontrol et.");
      setYukleniyor(false);
    }
  };

  // form submit olduğunda
  const handleSubmit = (event) => {
    event.preventDefault();
    const temizlenmis = bazDoviz.trim();

    if (!temizlenmis) {
      setHata("Para birimi girmelisin. Örn: TRY, USD");
      return;
    }

    const buyukHarfli = temizlenmis.toUpperCase();
    kurlariGetir(buyukHarfli);
  };

  // kur değerine göre renk class'ı (1'den büyükse yeşil)
  const renkClass = (para) => {
    if (!kurlar || !kurlar.values[para]) {
      return "";
    }
    if (kurlar.values[para] > 1) {
      return "yuksek";
    } else {
      return "dusuk";
    }
  };

  // önceki kurlarla karşılaştır, renk class'ı döndür
  const degisimClass = (para) => {
    if (!kurlar || !oncekiKurlar) {
      return "";
    }

    const simdiki = kurlar.values[para];
    const onceki = oncekiKurlar.values ? oncekiKurlar.values[para] : null;

    if (simdiki == null || onceki == null) {
      return "";
    }

    if (simdiki > onceki) {
      return "artti";
    } else if (simdiki < onceki) {
      return "azaldi";
    } else {
      return "ayni";
    }
  };

  // değişim metni
  const degisimMetni = (para) => {
    if (!kurlar || !oncekiKurlar) {
      return "-";
    }

    const simdiki = kurlar.values[para];
    const onceki = oncekiKurlar.values ? oncekiKurlar.values[para] : null;

    if (simdiki == null || onceki == null) {
      return "-";
    }

    if (simdiki > onceki) {
      return "Arttı";
    } else if (simdiki < onceki) {
      return "Azaldı";
    } else {
      return "Değişmedi";
    }
  };

  // gösterilecek para birimleri (baz para birimini çıkar)
  const tumParalar = ["USD", "EUR", "GBP", "TRY"];
  const gosterilecekler = kurlar 
    ? tumParalar.filter(para => para !== kurlar.base)
    : [];

  return (
    <main className="icerik">
      <section className="form-kutusu">
        <h2>Baz Para Birimi Seçimi</h2>
        <p className="aciklama">
          Aşağıdaki alana baz para birimini girin. Bu para birimi, diğer para birimlerinin karşılaştırılacağı referans noktası olacaktır.
        </p>
        <p>
          Örnek girişler: <strong>TRY</strong>, <strong>USD</strong>,{" "}
          <strong>EUR</strong>, <strong>GBP</strong> gibi.
        </p>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="bazDoviz">Baz Para Birimi:</label>
          <input
            id="bazDoviz"
            type="text"
            value={bazDoviz}
            onChange={(e) => setBazDoviz(e.target.value)}
            placeholder="Örn: TRY"
          />
          <button type="submit">Kurları Getir</button>
        </form>
      </section>

      <section className="durum-kutusu">
        {yukleniyor && <p className="bilgi">Yükleniyor...</p>}
        {hata && !yukleniyor && <p className="hata-mesaji">{hata}</p>}
      </section>

      <section className="doviz-kutusu">
        <h2>Döviz Oranları</h2>

        {!kurlar && !yukleniyor && !hata && (
          <p className="bilgi">
            Henüz veri yok. Lütfen bir baz para birimi girip "Kurları Getir" butonuna basın.
          </p>
        )}

        {kurlar && (
          <>
            <p className="bilgi">
              Baz Para Birimi: <strong>{kurlar.base}</strong> | Tarih:{" "}
              <strong>{kurlar.date}</strong>
            </p>

            <div className="tablo">
              <div className="tablo-baslik">
                <div>Para Birimi</div>
                <div>Birim Karşılığı</div>
                <div>Durum</div>
              </div>

              {gosterilecekler.map((para) => (
                <div
                  key={para}
                  className={`tablo-satir ${degisimClass(para)} ${renkClass(para)}`}
                >
                  <div className="hucre para-adi">
                    {para}
                  </div>
                  <div className="hucre kur-degeri">
                    {kurlar.values[para]
                      ? kurlar.values[para].toFixed(4)
                      : "Veri yok"}
                  </div>
                  <div className="hucre durum-metni">
                    {degisimMetni(para)}
                  </div>
                </div>
              ))}
            </div>

            <p className="kucuk-not">
              Not: Renkler, son istek ile bir önceki istek arasındaki değişimi
              gösterir. Yeşil: artış, kırmızı: düşüş, gri: değişmedi.
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default Content;
