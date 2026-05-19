class WeaveSimulator {
  constructor() {
    this.canvas = document.getElementById('weaveCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.mode = 'braid';
    this.thickness = 8;
    this.density = 20;
    this.colors = ['#E74C3C', '#F39C12', '#3498DB'];
    this.isAnimating = false;
    this.animationProgress = 0;
    this.animationId = null;

    this.initControls();
    this.draw();
  }

  initControls() {
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.mode = e.target.dataset.mode;
        document.getElementById('modeLabel').textContent = this.getModeLabel();
        this.animationProgress = 0;
        this.draw();
      });
    });

    const thicknessSlider = document.getElementById('thickness');
    thicknessSlider.addEventListener('input', (e) => {
      this.thickness = parseInt(e.target.value);
      document.getElementById('thicknessValue').textContent = this.thickness;
      this.draw();
    });

    const densitySlider = document.getElementById('density');
    densitySlider.addEventListener('input', (e) => {
      this.density = parseInt(e.target.value);
      document.getElementById('densityValue').textContent = this.density;
      this.draw();
    });

    document.querySelectorAll('.color-preset').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.color-preset').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.colors = JSON.parse(e.target.dataset.colors);
        document.getElementById('color1').value = this.colors[0];
        document.getElementById('color2').value = this.colors[1];
        document.getElementById('color3').value = this.colors[2];
        this.draw();
      });
    });

    ['color1', 'color2', 'color3'].forEach((id, index) => {
      document.getElementById(id).addEventListener('input', (e) => {
        this.colors[index] = e.target.value;
        document.querySelectorAll('.color-preset').forEach(b => b.classList.remove('active'));
        this.draw();
      });
    });

    document.getElementById('animateBtn').addEventListener('click', () => {
      this.toggleAnimation();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      this.reset();
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
      this.exportImage();
    });
  }

  getModeLabel() {
    const labels = {
      braid: '麻花辫模式',
      plain: '平纹编织模式',
      twill: '斜纹编织模式'
    };
    return labels[this.mode] || '未知模式';
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#fafafa';
    this.ctx.fillRect(0, 0, this.width, this.height);

    switch (this.mode) {
      case 'braid':
        this.drawBraid();
        break;
      case 'plain':
        this.drawPlainWeave();
        break;
      case 'twill':
        this.drawTwillWeave();
        break;
    }
  }

  drawBraid() {
    const strands = 3;
    const strandWidth = this.thickness * 2.5;
    const totalWidth = strandWidth * strands;
    const startX = this.width / 2 - totalWidth / 2;
    const startY = 30;
    const endY = this.height - 30;
    const segmentHeight = this.density * 3;

    const progress = this.isAnimating ? this.animationProgress : 1;
    const drawEndY = startY + (endY - startY) * progress;

    const positions = [0, 1, 2];
    const swapPatterns = [
      [0, 1],
      [1, 2],
      [1, 0],
      [2, 1]
    ];

    const strandPaths = [];
    for (let s = 0; s < strands; s++) {
      strandPaths.push([]);
    }

    let currentPositions = [...positions];
    let patternIndex = 0;

    for (let y = startY; y <= drawEndY; y += segmentHeight) {
      const segmentEndY = Math.min(y + segmentHeight, drawEndY);
      const midY = y + segmentHeight / 2;

      for (let s = 0; s < strands; s++) {
        const currentX = startX + currentPositions[s] * strandWidth + strandWidth / 2;
        strandPaths[s].push({ x: currentX, y: y });
      }

      if (segmentEndY > y) {
        const swap = swapPatterns[patternIndex % swapPatterns.length];
        const newPositions = [...currentPositions];
        [newPositions[swap[0]], newPositions[swap[1]]] = [newPositions[swap[1]], newPositions[swap[0]]];

        for (let s = 0; s < strands; s++) {
          const startXPos = startX + currentPositions[s] * strandWidth + strandWidth / 2;
          const endXPos = startX + newPositions[s] * strandWidth + strandWidth / 2;

          const cp1x = startXPos;
          const cp1y = midY - segmentHeight * 0.1;
          const cp2x = endXPos;
          const cp2y = midY + segmentHeight * 0.1;

          strandPaths[s].push({
            x: endXPos,
            y: segmentEndY,
            isCurve: true,
            cp1x, cp1y, cp2x, cp2y,
            startX: startXPos,
            startY: y
          });
        }

        currentPositions = newPositions;
        patternIndex++;
      }
    }

    const layers = [];
    for (let y = startY; y < drawEndY; y += segmentHeight / 2) {
      const layerOrder = this.getBraidLayerOrder(y, startY, segmentHeight, swapPatterns);
      layers.push({ y, order: layerOrder });
    }

    for (let layer of layers) {
      for (let s of layer.order) {
        const path = strandPaths[s];
        if (path.length < 2) continue;

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.colors[s];
        this.ctx.lineWidth = this.thickness;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        let started = false;
        for (let i = 0; i < path.length - 1; i++) {
          const p1 = path[i];
          const p2 = path[i + 1];

          if (p2.y < layer.y - segmentHeight / 2 || p1.y > layer.y + segmentHeight / 2) {
            continue;
          }

          if (!started) {
            this.ctx.moveTo(p1.x, p1.y);
            started = true;
          }

          if (p2.isCurve) {
            this.ctx.bezierCurveTo(p2.cp1x, p2.cp1y, p2.cp2x, p2.cp2y, p2.x, p2.y);
          } else {
            this.ctx.lineTo(p2.x, p2.y);
          }
        }
        this.ctx.stroke();
      }
    }

    for (let s = 0; s < strands; s++) {
      const path = strandPaths[s];
      if (path.length < 2) continue;

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.colors[s];
      this.ctx.lineWidth = this.thickness + 2;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.globalCompositeOperation = 'destination-over';

      this.ctx.moveTo(path[0].x, path[0].y);
      for (let i = 0; i < path.length - 1; i++) {
        const p2 = path[i + 1];
        if (p2.isCurve) {
          this.ctx.bezierCurveTo(p2.cp1x, p2.cp1y, p2.cp2x, p2.cp2y, p2.x, p2.y);
        } else {
          this.ctx.lineTo(p2.x, p2.y);
        }
      }
      this.ctx.stroke();
      this.ctx.globalCompositeOperation = 'source-over';
    }
  }

  getBraidLayerOrder(y, startY, segmentHeight, swapPatterns) {
    const relativeY = y - startY;
    const segmentIndex = Math.floor(relativeY / segmentHeight);
    const positionInSegment = (relativeY % segmentHeight) / segmentHeight;

    let positions = [0, 1, 2];
    for (let i = 0; i < segmentIndex; i++) {
      const swap = swapPatterns[i % swapPatterns.length];
      [positions[swap[0]], positions[swap[1]]] = [positions[swap[1]], positions[swap[0]]];
    }

    const nextSwap = swapPatterns[segmentIndex % swapPatterns.length];
    const order = [0, 1, 2];

    if (positionInSegment > 0.3 && positionInSegment < 0.7) {
      [order[nextSwap[0]], order[nextSwap[1]]] = [order[nextSwap[1]], order[nextSwap[0]]];
    }

    return order;
  }

  drawPlainWeave() {
    const gridSize = this.thickness * 2;
    const startX = 50;
    const startY = 50;
    const endX = this.width - 50;
    const endY = this.height - 50;
    const cols = Math.floor((endX - startX) / gridSize);
    const rows = Math.floor((endY - startY) / gridSize);

    const progress = this.isAnimating ? this.animationProgress : 1;
    const visibleRows = Math.floor(rows * progress);

    this.ctx.lineWidth = this.thickness;
    this.ctx.lineCap = 'round';

    for (let i = 0; i < cols; i++) {
      const x = startX + i * gridSize + gridSize / 2;
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.colors[i % this.colors.length];
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, startY + visibleRows * gridSize);
      this.ctx.stroke();
    }

    for (let j = 0; j < visibleRows; j++) {
      const y = startY + j * gridSize + gridSize / 2;
      for (let i = 0; i < cols; i++) {
        const x = startX + i * gridSize + gridSize / 2;
        const isOver = (i + j) % 2 === 0;

        if (isOver) {
          this.ctx.beginPath();
          this.ctx.fillStyle = this.colors[(j + 1) % this.colors.length];
          this.ctx.fillRect(x - gridSize / 2, y - this.thickness / 2, gridSize, this.thickness);

          this.ctx.beginPath();
          this.ctx.fillStyle = this.colors[i % this.colors.length];
          this.ctx.fillRect(x - this.thickness / 2, y - gridSize / 2, this.thickness, gridSize / 2 - this.thickness / 2);
          this.ctx.fillRect(x - this.thickness / 2, y + this.thickness / 2, this.thickness, gridSize / 2 - this.thickness / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.fillStyle = this.colors[i % this.colors.length];
          this.ctx.fillRect(x - this.thickness / 2, y - gridSize / 2, this.thickness, gridSize);

          this.ctx.beginPath();
          this.ctx.fillStyle = this.colors[(j + 1) % this.colors.length];
          this.ctx.fillRect(x - gridSize / 2, y - this.thickness / 2, gridSize / 2 - this.thickness / 2, this.thickness);
          this.ctx.fillRect(x + this.thickness / 2, y - this.thickness / 2, gridSize / 2 - this.thickness / 2, this.thickness);
        }
      }
    }

    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      const x = startX + i * gridSize;
      this.ctx.beginPath();
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, startY + visibleRows * gridSize);
      this.ctx.stroke();
    }
    for (let j = 0; j <= visibleRows; j++) {
      const y = startY + j * gridSize;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(startX + cols * gridSize, y);
      this.ctx.stroke();
    }
  }

  drawTwillWeave() {
    const threadWidth = this.thickness;
    const gap = 2;
    const cellSize = threadWidth + gap;
    const startX = 40;
    const startY = 40;
    const endX = this.width - 40;
    const endY = this.height - 40;
    const cols = Math.floor((endX - startX) / cellSize);
    const rows = Math.floor((endY - startY) / cellSize);

    const progress = this.isAnimating ? this.animationProgress : 1;
    const visibleRows = Math.floor(rows * progress);

    const twillPattern = [1, 1, 0, 0];
    const patternLength = twillPattern.length;

    this.ctx.lineCap = 'square';

    for (let i = 0; i < cols; i++) {
      const x = startX + i * cellSize;
      this.ctx.fillStyle = this.colors[i % this.colors.length];
      this.ctx.globalAlpha = 0.15;
      this.ctx.fillRect(x, startY, threadWidth, visibleRows * cellSize);
    }
    this.ctx.globalAlpha = 1;

    for (let j = 0; j < visibleRows; j++) {
      const y = startY + j * cellSize;
      const rowOffset = j % patternLength;

      for (let i = 0; i < cols; i++) {
        const x = startX + i * cellSize;
        const patternIndex = (i + rowOffset) % patternLength;
        const isWarpOver = twillPattern[patternIndex] === 1;

        if (isWarpOver) {
          this.ctx.fillStyle = this.colors[i % this.colors.length];
          this.ctx.fillRect(x, y, threadWidth, threadWidth);

          this.ctx.fillStyle = this.colors[(j + 1) % this.colors.length];
          this.ctx.fillRect(x, y + threadWidth / 2 - 1, threadWidth / 2 - 1, 2);
          this.ctx.fillRect(x + threadWidth / 2 + 1, y + threadWidth / 2 - 1, threadWidth / 2, 2);
        } else {
          this.ctx.fillStyle = this.colors[(j + 1) % this.colors.length];
          this.ctx.fillRect(x, y, threadWidth, threadWidth);

          this.ctx.fillStyle = this.colors[i % this.colors.length];
          this.ctx.fillRect(x + threadWidth / 2 - 1, y, 2, threadWidth / 2 - 1);
          this.ctx.fillRect(x + threadWidth / 2 - 1, y + threadWidth / 2 + 1, 2, threadWidth / 2);
        }
      }
    }

    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      const x = startX + i * cellSize - gap / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, startY + visibleRows * cellSize);
      this.ctx.stroke();
    }
    for (let j = 0; j <= visibleRows; j++) {
      const y = startY + j * cellSize - gap / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(startX + cols * cellSize, y);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = 'rgba(102, 126, 234, 0.4)';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    for (let d = -cols; d < rows; d += 2) {
      this.ctx.beginPath();
      const startCol = Math.max(0, -d);
      const startRow = Math.max(0, d);
      const endCol = Math.min(cols, rows - d);
      if (startCol < endCol) {
        this.ctx.moveTo(startX + startCol * cellSize + threadWidth / 2, startY + (startRow + d) * cellSize + threadWidth / 2);
        this.ctx.lineTo(startX + endCol * cellSize + threadWidth / 2, startY + (endCol + d) * cellSize + threadWidth / 2);
      }
      this.ctx.stroke();
    }
    this.ctx.setLineDash([]);
  }

  toggleAnimation() {
    const btn = document.getElementById('animateBtn');
    if (this.isAnimating) {
      this.stopAnimation();
      btn.textContent = '▶ 播放动画';
    } else {
      this.startAnimation();
      btn.textContent = '⏸ 暂停动画';
    }
  }

  startAnimation() {
    this.isAnimating = true;
    this.animationProgress = 0;
    this.animate();
  }

  stopAnimation() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    if (!this.isAnimating) return;

    this.animationProgress += 0.008;
    if (this.animationProgress >= 1) {
      this.animationProgress = 1;
      this.isAnimating = false;
      document.getElementById('animateBtn').textContent = '▶ 播放动画';
      this.draw();
      return;
    }

    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  reset() {
    this.stopAnimation();
    this.animationProgress = 0;
    document.getElementById('animateBtn').textContent = '▶ 播放动画';
    this.draw();
  }

  exportImage() {
    const dataURL = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `weave-${this.mode}-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new WeaveSimulator();
});
