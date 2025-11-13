        // 見つけた子どもの数をカウント
        let foundChildren = 0;
        const totalChildren = 6;
        const logo = document.getElementById('festivalLogo');
        const initialMessage = document.getElementById('initialMessage');

        // すべての花エリアを取得
        const cosmosAreas = document.querySelectorAll('.cosmos-area');

        // 画像切り替え機能
        const childImages = {
            'child1': [
                'images/children_img01_1.png',
                'images/children_img01_2.png', 
                'images/children_img01_3.png'
            ],
            'child2': [
                'images/children_img02_1.png',
                'images/children_img02_2.png', 
                'images/children_img02_3.png'
            ],
            'child3': [
                'images/children_img03_1.png',
                'images/children_img03_2.png', 
                'images/children_img03_3.png'
            ],
            'child4': [
                'images/children_img04_1.png',
                'images/children_img04_2.png', 
                'images/children_img04_3.png'
            ],
            'child5': [
                'images/children_img05_1.png',
                'images/children_img05_2.png', 
                'images/children_img05_3.png'
            ],
            'child6': [
                'images/children_img06_1.png',
                'images/children_img06_2.png', 
                'images/children_img06_3.png'
            ]
        };

        const currentImageIndexes = {
            'child1': 0, 'child2': 0, 'child3': 0, 
            'child4': 0, 'child5': 0, 'child6': 0
        };

        // 各子どもの画像クリックイベント設定
        function setupChildImageSwitch(childId) {
            const childImage = document.getElementById(childId + '-image');
            
            if (childImage) {
                childImage.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const images = childImages[childId];
                    const currentIndex = currentImageIndexes[childId];
                    
                    // 最後の画像（3番目）に到達したら終了
                    if (currentIndex < images.length - 1) {
                        currentImageIndexes[childId]++;
                        this.src = images[currentImageIndexes[childId]];
                    }
                });
            }
        }

        if (initialMessage) {
            initialMessage.classList.add('show');
            setTimeout(() => {
                initialMessage.classList.remove('show');
            }, 5000);
        }

        // 各花エリアにクリックイベントを設定
        cosmosAreas.forEach(cosmos => {
            cosmos.addEventListener('click', function() {
                // どの子どもを表示するか取得
                const childId = this.getAttribute('data-child');
                const child = document.getElementById(childId);
                
                console.log('花クリック:', childId, '要素:', child);

                // まだ表示されていない場合のみ処理
                if (!child.classList.contains('show')) {
                    console.log('子どもを表示:', childId);
                    // 子どもを表示
                    child.classList.add('show');
                    
                    // 花の揺れを止める
                    this.classList.remove('wiggle');
                    
                    // クリックできないようにする
                    this.style.pointerEvents = 'none';
                    
                    // カウント増加
                    foundChildren++;

                    // 画像切り替え機能を設定
                    setTimeout(() => {
                        setupChildImageSwitch(childId);
                    }, 100);

                    // 効果音（オプション - コメントアウト）
                    // playSound();

                    // 全員見つけたかチェック
                    if (foundChildren === totalChildren) {
                        setTimeout(() => {
                            showCompleteMessage();
                        }, 500);
                    }
                }
            });
        });

        // 完了メッセージを表示
        function showCompleteMessage() {
            const message = document.getElementById('completeMessage');
            message.classList.add('show');

            if (logo && !logo.classList.contains('visible')) {
                logo.classList.add('visible');
            }

            // 5秒後にメッセージを消す
            setTimeout(() => {
                message.classList.remove('show');
            }, 5000);
        }

        // 効果音を再生（オプション）
        function playSound() {
            // const audio = new Audio('sound.mp3');
            // audio.play();
        }

        // キラキラ光の演出
        function createSparkleParticle(){
            const container = document.querySelector('.banner-container');
            const particle = document.createElement('div');
            particle.className = 'sunbeam-particle';

            // 左上から右下の範囲でランダムな位置に配置
            const x = Math.random() * 80 + 10; //10-90%
            const y = Math.random() * 80 + 10; //10-90%

            particle.style.left = x +'%';
            particle.style.top = y +'%';

            // ランダムな遅延でアニメーション
            particle.style.animationDelay = Math.random() * 2 + 's';

            container.appendChild(particle);

            // アニメーション終了後に削除
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }

        //定期的にキラキラを生成
        setInterval(() => {
            createSparkleParticle();
        }, 300);

// 画面全体から斜めに降りる光の粒子
function createFallingBeam() {
    const container = document.querySelector('.banner-container');
    const particle = document.createElement('div');
    particle.className = 'sunbeam-falling';
    
    // 画面の上部から開始（より広い範囲）
    const startX = Math.random() * 100; // 0-100%（画面全体の幅）
    const startY = Math.random() * 90; // 0-30%（画面上部30%の範囲）
    
    particle.style.left = startX + '%';
    particle.style.top = startY + '%';
    
    // ランダムな遅延でアニメーション
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // アニメーション終了後に削除
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// 放射状の粒子を定期的に生成
setInterval(() => {
    createFallingBeam();
}, 40); // 0.4秒ごとに生成

