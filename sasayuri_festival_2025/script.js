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