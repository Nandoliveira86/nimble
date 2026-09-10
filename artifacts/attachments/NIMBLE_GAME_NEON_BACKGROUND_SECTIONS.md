# NIMBLE GAME — COMPLEMENTO DE AMBIENTAÇÃO NEON
**Versão:** 1.0  
**Escopo:** Background global com halos neon pulsantes + seções com contorno neon animado

---

## 20. Complemento de Ambientação Global — Background Neon Pulsante

Este complemento define dois elementos visuais que passam a fazer parte da linguagem central do **Nimble Game**:

1. **background com halos/círculos neon pulsantes extremamente sutis**
2. **contornos de seções com trilha neon animada percorrendo a borda**

A intenção não é criar uma interface exagerada ou chamativa demais, mas sim uma sensação de **energia viva, tecnológica e gamer premium**, quase como se a interface “respirasse”.

---

## 21. Background Global com Halos Neon Pulsantes

### 21.1. Objetivo
Criar um fundo escuro sofisticado, com profundidade, usando luz difusa muito sutil em azul e rosa neon, distribuída em grandes formas circulares desfocadas.

Esse efeito deve:
- dar identidade visual contínua ao produto
- enriquecer a atmosfera sem competir com o conteúdo
- reforçar o branding do app em toda a experiência
- funcionar tanto em login quanto em dashboard, biblioteca, tela de detalhes e menus

### 21.2. Conceito visual
O fundo deve ser composto por:
- base preta / azul-escura quase preta
- gradientes circulares grandes e desfocados
- halos com baixa opacidade
- pulsação lenta e suave
- leve sensação de movimento orgânico
- brilho atmosférico, não decorativo gritante

### 21.3. Distribuição recomendada

#### Halo 1 — Azul principal
- posição: topo esquerdo ou centro superior
- cor base: azul neon
- tamanho: grande
- opacidade: baixa

#### Halo 2 — Rosa principal
- posição: canto inferior direito
- cor base: rosa neon
- tamanho: grande
- opacidade: baixa

#### Halo 3 — Glow auxiliar frio
- posição: centro lateral ou fundo intermediário
- cor: azul profundo / ciano suave
- uso opcional

#### Halo 4 — Glow auxiliar magenta
- posição: região oposta ao glow frio
- cor: magenta leve
- uso opcional

### 21.4. Regra de intensidade
Os halos precisam ser **quase imperceptíveis em leitura direta**.

Eles devem parecer:
- uma ambiência
- um campo energético ao fundo
- um glow de profundidade
- nunca uma ilustração gritante

#### Nunca fazer
- círculos muito marcados
- neon com opacidade alta
- pulsação rápida
- contraste exagerado
- fundo colorido demais
- manchas que prejudiquem textos ou thumbnails

### 21.5. Paleta do background pulsante

| Token | Nome | Valor |
|---|---|---|
| `bg.halo.blue` | Halo Blue | `rgba(0, 209, 255, 0.16)` |
| `bg.halo.pink` | Halo Pink | `rgba(255, 43, 214, 0.14)` |
| `bg.halo.blue.soft` | Halo Blue Soft | `rgba(0, 209, 255, 0.08)` |
| `bg.halo.pink.soft` | Halo Pink Soft | `rgba(255, 43, 214, 0.08)` |
| `bg.halo.deep` | Halo Deep Blend | `rgba(18, 24, 38, 0.55)` |

### 21.6. Estrutura recomendada em camadas

#### Camada 1 — Base
```css
background:
  radial-gradient(circle at 20% 15%, rgba(0, 209, 255, 0.08) 0%, transparent 28%),
  radial-gradient(circle at 85% 80%, rgba(255, 43, 214, 0.08) 0%, transparent 30%),
  linear-gradient(180deg, #07090F 0%, #0A0D14 100%);
```

#### Camada 2 — Halos grandes
```css
background:
  radial-gradient(circle at 18% 14%, rgba(0, 209, 255, 0.14) 0%, transparent 24%),
  radial-gradient(circle at 82% 78%, rgba(255, 43, 214, 0.12) 0%, transparent 28%);
```

#### Camada 3 — Profundidade auxiliar
```css
background:
  radial-gradient(circle at 60% 25%, rgba(0, 209, 255, 0.05) 0%, transparent 20%),
  radial-gradient(circle at 35% 75%, rgba(255, 43, 214, 0.04) 0%, transparent 18%);
```

### 21.7. Movimento / pulsação dos halos
O movimento precisa ser:
- lento
- suave
- respirado
- quase imperceptível

Comportamento ideal:
- aumento e redução leve de escala
- variação suave de opacidade
- microdeslocamento de posição
- ciclos longos

Duração recomendada:
- entre **8s e 18s**
- com diferenças entre elementos para não ficar mecânico

### 21.8. Exemplo de animação dos halos

```css
@keyframes nimbleHaloPulseBlue {
  0% {
    transform: scale(1) translate3d(0, 0, 0);
    opacity: 0.45;
  }
  50% {
    transform: scale(1.08) translate3d(8px, -6px, 0);
    opacity: 0.62;
  }
  100% {
    transform: scale(1) translate3d(0, 0, 0);
    opacity: 0.45;
  }
}

@keyframes nimbleHaloPulsePink {
  0% {
    transform: scale(1) translate3d(0, 0, 0);
    opacity: 0.40;
  }
  50% {
    transform: scale(1.06) translate3d(-10px, 8px, 0);
    opacity: 0.56;
  }
  100% {
    transform: scale(1) translate3d(0, 0, 0);
    opacity: 0.40;
  }
}
```

### 21.9. Regras de uso do background global
Aplicar em:
- login
- splash screen
- home
- library
- continue playing
- favorites
- profile
- settings
- modais amplos
- telas vazias
- telas promocionais

Evitar uso intenso em:
- telas com excesso de texto
- tabelas densas
- relatórios ou páginas utilitárias extremamente técnicas

Nesses casos, usar:
- versão reduzida
- menor opacidade
- menos halos

---

## 22. Seções com Contorno Neon Animado

### 22.1. Objetivo
As seções do app, como:
- Continue Playing
- Recently Played
- Favorites
- Recommended
- Library Collections
- Friends Activity

devem possuir um contorno neon arredondado com aparência premium, e um ponto/luz correndo pela trilha da borda de forma sutil.

A sensação buscada é:
- energia viva
- interface tecnológica
- “circuito ativo”
- seção destacada, mas elegante

### 22.2. Conceito visual
Cada bloco de seção deve ter:
- container escuro
- borda arredondada
- linha fina neon azul/rosa
- glow externo extremamente controlado
- brilho em movimento percorrendo a borda

Essa linha não deve parecer loading.  
Ela deve parecer uma **corrente luminosa discreta** passando pelo contorno.

### 22.3. Estrutura visual da seção
Cada seção deve conter:
1. **background interno escuro**
2. **borda arredondada principal**
3. **linha neon externa ou interna**
4. **glow suave**
5. **highlight animado correndo pela borda**

### 22.4. Estilo padrão da seção

| Propriedade | Recomendação |
|---|---|
| Background | `#0F1218` a `#131722` |
| Border radius | `20px` a `28px` |
| Border base | `1px solid rgba(255,255,255,0.06)` |
| Glow base | azul/rosa bem suave |
| Padding interno | `18px` a `28px` |
| Overflow | hidden |
| Posição | relative |

### 22.5. Linguagem de cor da borda

#### Variante A — Azul dominante
Ideal para:
- Continue Playing
- Library
- Home collections

#### Variante B — Rosa dominante
Ideal para:
- Favorites
- recomendações especiais
- destaque editorial

#### Variante C — Mista
Ideal para:
- blocos hero
- faixas principais
- seções premium

### 22.6. Regras de glow da borda
A borda deve emitir:
- brilho periférico muito suave
- um halo refinado
- leve bloom nas quinas

Nunca usar:
- glow duro
- halo estourado
- neon muito espesso
- contorno com aspecto de arcade barato

### 22.7. Luz correndo pela borda
O efeito deve ter:
- um highlight estreito e brilhante
- movimento contínuo pelo contorno
- velocidade lenta ou média-lenta
- maior percepção nas quinas
- aparência elegante e premium

### 22.8. Estratégia técnica recomendada
A implementação pode usar:
1. **borda com gradiente animado**
2. **máscara com stroke fake**
3. **pseudo-elemento rotacionando gradiente**
4. **SVG rounded rect com stroke animado**

As opções preferenciais são:
- **pseudo-elemento com gradiente girando**
- **SVG com stroke animado**

### 22.9. Tokens sugeridos para seção neon

| Token | Nome | Valor |
|---|---|---|
| `section.border.blue` | Neon Section Blue | `#00D1FF` |
| `section.border.pink` | Neon Section Pink | `#FF2BD6` |
| `section.border.soft` | Soft Border | `rgba(255,255,255,0.08)` |
| `section.glow.blue` | Blue Glow | `rgba(0, 209, 255, 0.24)` |
| `section.glow.pink` | Pink Glow | `rgba(255, 43, 214, 0.22)` |
| `section.surface` | Section Surface | `#11151D` |

### 22.10. Exemplo de borda com trilha neon

```css
.section-neon {
  position: relative;
  border-radius: 24px;
  background: linear-gradient(180deg, #121722 0%, #0D1118 100%);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow:
    0 8px 28px rgba(0,0,0,0.35),
    0 0 18px rgba(0, 209, 255, 0.08),
    0 0 22px rgba(255, 43, 214, 0.06);
  overflow: hidden;
}
```

### 22.11. Exemplo de camada de borda animada

```css
.section-neon::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background:
    conic-gradient(
      from 0deg,
      rgba(0, 209, 255, 0.00) 0deg,
      rgba(0, 209, 255, 0.95) 40deg,
      rgba(255, 43, 214, 0.90) 85deg,
      rgba(255, 43, 214, 0.00) 130deg,
      rgba(0, 209, 255, 0.00) 360deg
    );
  animation: nimbleSectionOrbit 6s linear infinite;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### 22.12. Animação da trilha correndo

```css
@keyframes nimbleSectionOrbit {
  0% {
    transform: rotate(0deg);
    opacity: 0.82;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.82;
  }
}
```

### 22.13. Versão mais sutil

```css
.section-neon.soft::before {
  animation-duration: 10s;
  opacity: 0.55;
  filter: blur(0.4px);
}
```

### 22.14. Hierarquia de uso das seções

#### Intensidade alta
Usar em:
- hero sections
- bloco principal da home
- Continue Playing
- Recommended
- premium cards ou áreas de destaque

#### Intensidade média
Usar em:
- Recently Played
- Favorites
- Friends Activity
- blocos de carrossel

#### Intensidade baixa
Usar em:
- blocos secundários
- side widgets
- mini painéis
- seções utilitárias

### 22.15. Estados da seção

#### Default
- borda leve
- glow baixo
- highlight em movimento contínuo

#### Hover
- glow aumenta levemente
- trilha ganha um pouco mais de intensidade
- fundo levanta discretamente

#### Focus
- contorno mais visível
- borda reforçada
- aumento sutil do brilho

#### Selected
- azul ou rosa mais evidente
- glow um pouco mais presente
- motion levemente mais perceptível

### 22.16. Velocidade e comportamento recomendados

| Elemento | Duração |
|---|---|
| Halo pulsante fundo | `10s – 18s` |
| Halo auxiliar | `8s – 14s` |
| Trilho seção principal | `5s – 7s` |
| Trilho seção secundária | `7s – 10s` |
| Hover glow | `160ms – 220ms` |

---

## 23. Regras de equilíbrio visual

Esses efeitos existem para elevar a identidade do produto, não para virar ruído.

Prioridades:
1. conteúdo continua sendo o foco
2. animação deve ser periférica
3. glow deve ser controlado
4. leitura jamais pode piorar
5. o usuário deve sentir a interface viva, não cansativa

---

## 24. Resumo Executivo para Implementação

### Aplicar globalmente
- fundo escuro
- halos circulares azul e rosa
- pulsação muito sutil
- baixa opacidade
- movimento lento e respirado

### Aplicar nas seções
- containers arredondados
- borda neon refinada
- glow azul/rosa leve
- trilha luminosa percorrendo a borda
- animação contínua e elegante

### Sensação final desejada
> **Uma interface gamer premium com energia neon viva, mas sutil, em que o fundo respira e as seções parecem eletrificadas de forma sofisticada.**

---

## 25. Tokens finais complementares

```json
{
  "background": {
    "haloBlue": "rgba(0, 209, 255, 0.16)",
    "haloPink": "rgba(255, 43, 214, 0.14)",
    "haloBlueSoft": "rgba(0, 209, 255, 0.08)",
    "haloPinkSoft": "rgba(255, 43, 214, 0.08)"
  },
  "section": {
    "surface": "#11151D",
    "borderBlue": "#00D1FF",
    "borderPink": "#FF2BD6",
    "glowBlue": "rgba(0, 209, 255, 0.24)",
    "glowPink": "rgba(255, 43, 214, 0.22)"
  },
  "motion": {
    "haloPulseSlow": "14s",
    "haloPulseMedium": "10s",
    "sectionOrbitPrimary": "6s",
    "sectionOrbitSecondary": "9s",
    "hoverTransition": "180ms"
  }
}
```
