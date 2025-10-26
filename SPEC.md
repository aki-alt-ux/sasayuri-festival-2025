# ささゆりフェスタ 2025 仕様書

## プロジェクト概要
第4回ささゆりフェスタのWebバナーアプリケーション

## 基本仕様

### 1. 表示仕様
- **背景画像**: `images/background.jpg`
- **子ども**: 6人（child1〜child6）
- **花**: 6個（flower1〜flower6）
- **レイアウト**: 800px幅、レスポンシブ対応

### 2. 基本動作
- **初期状態**: 子どもは非表示（`opacity: 0`）
- **花をクリック** → 対応する子どもが表示される（`show`クラス追加）
- **花の揺れ**: クリック前は`wiggle`アニメーション
- **クリック後**: 花の揺れ停止、クリック無効化
- **全員発見**: 完了メッセージ表示

### 3. 視覚効果
- **キラキラ粒子**: 0.3秒間隔で生成
- **降りる光**: 0.04秒間隔で生成
- **完了メッセージ**: 5秒間表示後自動消去
- **3番目画像のバウンド**: `_3.png`画像のみ小刻みにバウンドアニメーション

## 特別機能

### 子どもの画像切り替え機能
- **対象**: `child1`〜`child6`（全員）
- **トリガー**: 各子どもが表示された後の画像クリック
- **画像順序**（各子ども共通）:
  1. `images/children_img0X_1.png`（初期）
  2. `images/children_img0X_2.png`
  3. `images/children_img0X_3.png`
  4. 3でクリックイベントは終了（3の表示のままにする）

### 制約事項
- **基本仕様は変更禁止**: 花→子ども表示の流れは維持
- **表示後のみ有効**: 各子どもが表示される前は画像切り替え不可
- **個別管理**: 各子どもの画像インデックスは独立して管理
- **非循環切り替え**: 1→2→3で終了、ループしない

## 技術仕様

### HTML構造
```html
<div class="children-container">
    <div id="child1" class="child">
        <img id="child1-image" src="images/children_img01_1.png" alt="子ども1" style="cursor: pointer;">
    </div>
    <div id="child2" class="child">
        <img id="child2-image" src="images/children_img02_1.png" alt="子ども2" style="cursor: pointer;">
    </div>
    <!-- child3〜child6 も同様 -->
</div>

<div class="flower-container">
    <div id="flower1" class="flower-area wiggle" data-child="child1">
        <img src="images/flower01.png" alt="花1">
    </div>
    <!-- flower2〜flower6 -->
</div>
```

### CSS要件
- `.child`: 初期状態で`opacity: 0`, `pointer-events: none`
- `.child.show`: 表示状態で`opacity: 1`, `transform: translateY(0)`
- `.child img`: 全員の子どもの画像はクリック可能（`cursor: pointer`, `pointer-events: auto`）
- `.child img[src*="_3.png"]`: 3番目の画像のみバウンドアニメーション

### JavaScript要件
- 花クリックイベントで子ども表示
- 各子ども表示後に画像切り替えイベント設定
- 画像配列の非循環切り替え（1→2→3で終了）
- イベント伝播の制御（`stopPropagation`）
- 各子どもの画像インデックスを個別管理

## ファイル構成
```
/
├── index.html          # メインHTML
├── style.css           # スタイルシート
├── script.js           # JavaScript
├── SPEC.md            # この仕様書
└── images/
    ├── background.jpg
    ├── children_img01_1.png, children_img01_2.png, children_img01_3.png
    ├── children_img02_1.png, children_img02_2.png, children_img02_3.png
    ├── children_img03_1.png, children_img03_2.png, children_img03_3.png
    ├── children_img04_1.png, children_img04_2.png, children_img04_3.png
    ├── children_img05_1.png, children_img05_2.png, children_img05_3.png
    ├── children_img06_1.png, children_img06_2.png, children_img06_3.png
    └── flower01.png〜flower06.png
```

## 開発ルール
1. **基本仕様の維持**: 花→子ども表示の流れは絶対に変更しない
2. **段階的実装**: 新機能は既存機能に影響しないよう実装
3. **仕様の確認**: 変更前は必ずこの仕様書を参照
4. **テスト**: 新機能追加後は全体的な動作確認を実施

---
**最終更新**: 2025年10月
**バージョン**: 1.0
