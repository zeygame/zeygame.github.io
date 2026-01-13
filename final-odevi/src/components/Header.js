import React from "react";

function Header() {
  return (
    <header className="ust-kisim">
      <h1>Döviz Takip Uygulaması</h1>
      <p>
        Bu uygulama, React ile API kullanımını öğrenmek için hazırlanmış basit bir döviz takip uygulamasıdır. 
        Seçtiğiniz baz para birimine göre diğer para birimlerinin (USD, EUR, GBP, TRY) güncel kur oranlarını görebilirsiniz.
      </p>
    </header>
  );
}

export default Header;
