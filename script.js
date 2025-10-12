        // 見つけた子どもの数をカウント
        let foundChildren = 0;
        const totalChildren = 6;

        // すべての花エリアを取得
        const flowerAreas = document.querySelectorAll('.flower-area');

        // 各花エリアにクリックイベントを設定
        flowerAreas.forEach(flower => {
            flower.addEventListener('click', function() {
                // どの子どもを表示するか取得
                const childId = this.getAttribute('data-child');
                const child = document.getElementById(childId);

                // まだ表示されていない場合のみ処理
                if (!child.classList.contains('show')) {
                    // 子どもを表示
                    child.classList.add('show');
                    
                    // 花の揺れを止める
                    this.classList.remove('wiggle');
                    
                    // クリックできないようにする
                    this.style.pointerEvents = 'none';
                    
                    // カウント増加
                    foundChildren++;

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