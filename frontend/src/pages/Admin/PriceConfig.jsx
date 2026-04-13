import React, { useState, useEffect } from 'react';
import { fetchHalls, fetchHallPrices, saveHallPrices } from '../../api/halls';

const PriceConfig = () => {
  const [halls, setHalls] = useState([]);
  const [activeHallId, setActiveHallId] = useState(null);
  const [priceStandard, setPriceStandard] = useState('');
  const [priceVip, setPriceVip] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHalls().then(setHalls).catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeHallId) return;
    setLoading(true);
    fetchHallPrices(activeHallId)
      .then(data => {
        setPriceStandard(data.price_standard);
        setPriceVip(data.price_vip);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeHallId]);

  const handleSave = async () => {
    if (!activeHallId) return;
    setSaving(true);
    try {
      await saveHallPrices(activeHallId, priceStandard, priceVip);
      alert('Цены сохранены');
    } catch (err) {
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (activeHallId) {
      setLoading(true);
      fetchHallPrices(activeHallId)
        .then(data => {
          setPriceStandard(data.price_standard);
          setPriceVip(data.price_vip);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  return (
    <section>
      <header className="section-header">
        <h2 className="section-title">Конфигурация цен</h2>
        <button className="section-header-button"></button>
      </header>
      <div className="manage-content">
        <p className="admin-text">Выберите зал для конфигурации:</p>
        <div className="switch-hall-buttons switch-hall-buttons-prices">
          {halls.map(hall => (
            <button
              key={hall.id}
              className={`switch-hall-button ${activeHallId === hall.id ? 'switch-hall-button-active' : ''}`}
              onClick={() => setActiveHallId(hall.id)}
            >
              {hall.name}
            </button>
          ))}
        </div>

        {activeHallId && (
          <>
            {loading ? (
              <p>Загрузка цен...</p>
            ) : (
              <>
                <p className="admin-text">Установите цены для типов кресел:</p>
                <div className="input-container">
                  <label className="admin-label">Цена, ₽</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      id="price-regular"
                      className="admin-input"
                      value={priceStandard}
                      onChange={(e) => setPriceStandard(e.target.value)}
                      min="0"
                    />
                    <div className="seat-scheme-item seat-scheme-item-regular"></div>
                    <p className="legend-text">обычные кресла</p>
                  </div>
                </div>
                <div className="input-container">
                  <label className="admin-label">Цена, ₽</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      id="price-vip"
                      className="admin-input"
                      value={priceVip}
                      onChange={(e) => setPriceVip(e.target.value)}
                      min="0"
                    />
                    <div className="seat-scheme-item seat-scheme-item-vip"></div>
                    <p className="legend-text">VIP кресла</p>
                  </div>
                </div>
                <div className="admin-buttons">
                  <button className="button admin-white-button" onClick={handleCancel}>Отменить</button>
                  <button className="button admin-button" onClick={handleSave} disabled={saving}>
                    {saving ? 'Сохранение...' : 'Сохранить'}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PriceConfig;