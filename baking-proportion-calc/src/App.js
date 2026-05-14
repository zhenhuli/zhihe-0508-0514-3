import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #8B4513;
  margin-bottom: 40px;
  font-size: 2rem;
`;

const Card = styled.div`
  background: #fff8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(139, 69, 19, 0.1);
`;

const SectionTitle = styled.h2`
  color: #8B4513;
  margin-bottom: 16px;
  font-size: 1.25rem;
  border-bottom: 2px solid #DEB887;
  padding-bottom: 8px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const Label = styled.label`
  color: #5D4037;
  font-weight: 500;
  min-width: 120px;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 2px solid #DEB887;
  border-radius: 8px;
  font-size: 1rem;
  width: 150px;
  color: #5D4037;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #8B4513;
  }
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 2px solid #DEB887;
  border-radius: 8px;
  font-size: 1rem;
  color: #5D4037;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #8B4513;
  }
`;

const Button = styled.button`
  padding: 10px 24px;
  background: #8B4513;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #A0522D;
  }
`;

const PresetButton = styled(Button)`
  background: #DEB887;
  color: #5D4037;
  font-size: 0.9rem;
  padding: 8px 16px;
  
  &:hover {
    background: #D2B48C;
  }
`;

const PresetContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #F5DEB3;
`;

const ResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const Th = styled.th`
  background: #DEB887;
  color: #5D4037;
  padding: 12px;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #F5DEB3;
  color: #5D4037;
`;

const Tr = styled.tr`
  &:hover {
    background: #FFF5E6;
  }
`;

const Highlight = styled.span`
  font-weight: 600;
  color: #8B4513;
`;

const defaultRatios = {
  sugar: 50,
  oil: 30,
  yeast: 1.5,
  salt: 1,
  water: 60,
  milk: 20
};

const ingredientNames = {
  flour: '面粉',
  sugar: '糖',
  oil: '油',
  yeast: '酵母',
  salt: '盐',
  water: '水',
  milk: '牛奶'
};

const presets = [
  {
    name: '🥟 馒头',
    flourAmount: 500,
    baseServings: 5,
    ratios: {
      sugar: 5,
      oil: 0,
      yeast: 1,
      salt: 0.5,
      water: 50,
      milk: 0
    }
  },
  {
    name: '🍞 面包',
    flourAmount: 500,
    baseServings: 8,
    ratios: {
      sugar: 15,
      oil: 10,
      yeast: 1.5,
      salt: 1,
      water: 45,
      milk: 10
    }
  },
  {
    name: '🎂 蛋糕胚',
    flourAmount: 200,
    baseServings: 6,
    ratios: {
      sugar: 60,
      oil: 30,
      yeast: 0,
      salt: 0.5,
      water: 0,
      milk: 30
    }
  },
  {
    name: '🥐 吐司',
    flourAmount: 450,
    baseServings: 6,
    ratios: {
      sugar: 20,
      oil: 15,
      yeast: 1.2,
      salt: 1,
      water: 55,
      milk: 0
    }
  },
  {
    name: '🍪 曲奇',
    flourAmount: 250,
    baseServings: 4,
    ratios: {
      sugar: 50,
      oil: 50,
      yeast: 0,
      salt: 0.5,
      water: 0,
      milk: 10
    }
  },
  {
    name: '🥖 法棍',
    flourAmount: 500,
    baseServings: 4,
    ratios: {
      sugar: 0,
      oil: 0,
      yeast: 0.8,
      salt: 2,
      water: 65,
      milk: 0
    }
  }
];

function App() {
  const [flourAmount, setFlourAmount] = useState(500);
  const [flourUnit, setFlourUnit] = useState('g');
  const [servings, setServings] = useState(1);
  const [baseServings, setBaseServings] = useState(1);
  const [ratios, setRatios] = useState(defaultRatios);

  const calculateIngredients = () => {
    const scaleFactor = servings / baseServings;
    const baseFlour = flourAmount * scaleFactor;

    const ingredients = [
      { name: ingredientNames.flour, amount: baseFlour, unit: flourUnit, ratio: 100 },
      { name: ingredientNames.sugar, amount: (baseFlour * ratios.sugar) / 100, unit: flourUnit, ratio: ratios.sugar },
      { name: ingredientNames.oil, amount: (baseFlour * ratios.oil) / 100, unit: flourUnit, ratio: ratios.oil },
      { name: ingredientNames.yeast, amount: (baseFlour * ratios.yeast) / 100, unit: flourUnit, ratio: ratios.yeast },
      { name: ingredientNames.salt, amount: (baseFlour * ratios.salt) / 100, unit: flourUnit, ratio: ratios.salt },
      { name: ingredientNames.water, amount: (baseFlour * ratios.water) / 100, unit: flourUnit, ratio: ratios.water },
      { name: ingredientNames.milk, amount: (baseFlour * ratios.milk) / 100, unit: flourUnit, ratio: ratios.milk }
    ];

    return ingredients;
  };

  const ingredients = calculateIngredients();

  const handleRatioChange = (ingredient, value) => {
    setRatios(prev => ({
      ...prev,
      [ingredient]: parseFloat(value) || 0
    }));
  };

  const resetRatios = () => {
    setRatios(defaultRatios);
  };

  const applyPreset = (preset) => {
    setFlourAmount(preset.flourAmount);
    setBaseServings(preset.baseServings);
    setServings(preset.baseServings);
    setRatios(preset.ratios);
  };

  return (
    <Container>
      <Title>🍞 烘焙配方比例换算器</Title>

      <Card>
        <SectionTitle>📌 预设配方</SectionTitle>
        <PresetContainer>
          {presets.map((preset, index) => (
            <PresetButton key={index} onClick={() => applyPreset(preset)}>
              {preset.name}
            </PresetButton>
          ))}
        </PresetContainer>
      </Card>

      <Card>
        <SectionTitle>⚙️ 配料比例（相对于面粉 %）</SectionTitle>
        <InputGroup>
          <Label>面粉用量：</Label>
          <Input
            type="number"
            value={flourAmount}
            onChange={(e) => setFlourAmount(parseFloat(e.target.value) || 0)}
            min="0"
            step="10"
          />
          <Select value={flourUnit} onChange={(e) => setFlourUnit(e.target.value)}>
            <option value="g">克 (g)</option>
            <option value="ml">毫升 (ml)</option>
            <option value="cup">杯</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>糖：</Label>
          <Input
            type="number"
            value={ratios.sugar}
            onChange={(e) => handleRatioChange('sugar', e.target.value)}
            min="0"
            step="5"
          />
          <span style={{ color: '#5D4037' }}>%</span>
        </InputGroup>

        <InputGroup>
          <Label>油：</Label>
          <Input
            type="number"
            value={ratios.oil}
            onChange={(e) => handleRatioChange('oil', e.target.value)}
            min="0"
            step="5"
          />
          <span style={{ color: '#5D4037' }}>%</span>
        </InputGroup>

        <InputGroup>
          <Label>酵母：</Label>
          <Input
            type="number"
            value={ratios.yeast}
            onChange={(e) => handleRatioChange('yeast', e.target.value)}
            min="0"
            step="0.5"
          />
          <span style={{ color: '#5D4037' }}>%</span>
        </InputGroup>

        <InputGroup>
          <Label>盐：</Label>
          <Input
            type="number"
            value={ratios.salt}
            onChange={(e) => handleRatioChange('salt', e.target.value)}
            min="0"
            step="0.5"
          />
          <span style={{ color: '#5D4037' }}>%</span>
        </InputGroup>

        <InputGroup>
          <Label>水：</Label>
          <Input
            type="number"
            value={ratios.water}
            onChange={(e) => handleRatioChange('water', e.target.value)}
            min="0"
            step="5"
          />
          <span style={{ color: '#5D4037' }}>%</span>
        </InputGroup>

        <InputGroup>
          <Label>牛奶：</Label>
          <Input
            type="number"
            value={ratios.milk}
            onChange={(e) => handleRatioChange('milk', e.target.value)}
            min="0"
            step="5"
          />
          <span style={{ color: '#5D4037' }}>%</span>
        </InputGroup>

        <Button onClick={resetRatios} style={{ marginTop: '12px' }}>
          重置默认比例
        </Button>
      </Card>

      <Card>
        <SectionTitle>📐 基础设置</SectionTitle>
        <InputGroup>
          <Label>基础人数：</Label>
          <Input
            type="number"
            value={baseServings}
            onChange={(e) => setBaseServings(parseFloat(e.target.value) || 1)}
            min="1"
            step="1"
          />
          <span style={{ color: '#5D4037' }}>人份</span>
        </InputGroup>

        <InputGroup>
          <Label>目标人数：</Label>
          <Input
            type="number"
            value={servings}
            onChange={(e) => setServings(parseFloat(e.target.value) || 1)}
            min="1"
            step="1"
          />
          <span style={{ color: '#5D4037' }}>人份</span>
        </InputGroup>

        {servings !== baseServings && (
          <div style={{ marginTop: '12px', color: '#8B4513', fontWeight: '500' }}>
            缩放比例：<Highlight>{((servings / baseServings) * 100).toFixed(0)}%</Highlight>
          </div>
        )}
      </Card>

      <Card>
        <SectionTitle>📋 计算结果（{servings} 人份）</SectionTitle>
        <ResultTable>
          <thead>
            <tr>
              <Th>配料</Th>
              <Th>用量</Th>
              <Th>比例</Th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing, index) => (
              <Tr key={index}>
                <Td><Highlight>{ing.name}</Highlight></Td>
                <Td>
                  <Highlight>
                    {ing.amount.toFixed(1)} {ing.unit}
                  </Highlight>
                </Td>
                <Td>{ing.ratio}%</Td>
              </Tr>
            ))}
          </tbody>
        </ResultTable>
      </Card>
    </Container>
  );
}

export default App;
