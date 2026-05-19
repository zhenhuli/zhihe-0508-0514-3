import styles from './index.module.css';

const UNITS = {
  mm: { name: '毫米', factor: 0.001 },
  cm: { name: '厘米', factor: 0.01 },
  m: { name: '米', factor: 1 },
  km: { name: '千米', factor: 1000 }
};

const MAP_UNITS = ['mm', 'cm'];
const REAL_UNITS = ['m', 'km'];

function formatNumber(num) {
  if (num === 0) return '0';
  if (Math.abs(num) >= 1000) {
    return num.toFixed(2);
  }
  if (Math.abs(num) >= 1) {
    return num.toFixed(3);
  }
  return num.toFixed(6);
}

function convert(value, fromUnit, toUnit) {
  const meters = value * UNITS[fromUnit].factor;
  return meters / UNITS[toUnit].factor;
}

function calculateRealDistance(scaleNum, scaleDenom, mapDistance, mapUnit, realUnit) {
  const mapDistanceInMeters = mapDistance * UNITS[mapUnit].factor;
  const realDistanceInMeters = mapDistanceInMeters * scaleDenom / scaleNum;
  return realDistanceInMeters / UNITS[realUnit].factor;
}

function render() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="${styles.container}">
      <h1 class="${styles.title}">🗺️ 地图比例尺换算工具</h1>
      
      <div class="${styles.card}">
        <div class="${styles.formGroup}">
          <label class="${styles.label}">地图比例尺</label>
          <div class="${styles.scaleInput}">
            <input type="number" id="scaleNum" class="${styles.input}" value="1" min="1" step="1" />
            <span class="${styles.scaleSeparator}">:</span>
            <input type="number" id="scaleDenom" class="${styles.input}" value="50000" min="1" step="1" placeholder="如 50000" />
          </div>
        </div>

        <div class="${styles.formGroup}">
          <label class="${styles.label}">图上距离</label>
          <div class="${styles.scaleInput}">
            <input type="number" id="mapDistance" class="${styles.input}" value="1" min="0" step="0.01" placeholder="输入图上距离" />
            <select id="mapUnit" class="${styles.select}">
              ${MAP_UNITS.map(u => `<option value="${u}">${UNITS[u].name}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="${styles.formGroup}">
          <label class="${styles.label}">实际距离单位</label>
          <select id="realUnit" class="${styles.select}">
            ${REAL_UNITS.map(u => `<option value="${u}">${UNITS[u].name}</option>`).join('')}
          </select>
        </div>

        <div class="${styles.resultCard}" id="resultCard">
          <div class="${styles.resultLabel}">实际实地距离</div>
          <div class="${styles.resultValue}">
            <span id="resultValue">0</span>
            <span class="${styles.resultUnit}" id="resultUnit">米</span>
          </div>
          <div class="${styles.resultDetails}" id="resultDetails"></div>
        </div>

        <div class="${styles.formula}">
          <strong>计算公式：</strong><br/>
          实际距离 = 图上距离 × 比例尺分母 / 比例尺分子<br/>
          <span class="${styles.formulaCode}">实际距离 = 图上距离 × (${UNITS['mm'].factor} 或 ${UNITS['cm'].factor}) × 比例尺分母</span>
        </div>
      </div>
    </div>
  `;

  const scaleNumInput = document.getElementById('scaleNum');
  const scaleDenomInput = document.getElementById('scaleDenom');
  const mapDistanceInput = document.getElementById('mapDistance');
  const mapUnitSelect = document.getElementById('mapUnit');
  const realUnitSelect = document.getElementById('realUnit');
  const resultValueEl = document.getElementById('resultValue');
  const resultUnitEl = document.getElementById('resultUnit');
  const resultDetailsEl = document.getElementById('resultDetails');

  function update() {
    const scaleNum = parseFloat(scaleNumInput.value) || 1;
    const scaleDenom = parseFloat(scaleDenomInput.value) || 1;
    const mapDistance = parseFloat(mapDistanceInput.value) || 0;
    const mapUnit = mapUnitSelect.value;
    const realUnit = realUnitSelect.value;

    const result = calculateRealDistance(scaleNum, scaleDenom, mapDistance, mapUnit, realUnit);
    resultValueEl.textContent = formatNumber(result);
    resultUnitEl.textContent = UNITS[realUnit].name;

    const allResults = REAL_UNITS.map(u => {
      const val = calculateRealDistance(scaleNum, scaleDenom, mapDistance, mapUnit, u);
      return { unit: u, value: val };
    });

    resultDetailsEl.innerHTML = allResults.map(r => `
      <div class="${styles.resultDetail}">
        <div class="${styles.resultDetailValue}">${formatNumber(r.value)}</div>
        <div class="${styles.resultDetailUnit}">${UNITS[r.unit].name}</div>
      </div>
    `).join('');
  }

  [scaleNumInput, scaleDenomInput, mapDistanceInput, mapUnitSelect, realUnitSelect].forEach(el => {
    el.addEventListener('input', update);
    el.addEventListener('change', update);
  });

  update();
}

render();
