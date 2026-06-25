document.addEventListener('DOMContentLoaded', () => {
    const decryptBtn = document.getElementById('decryptBtn');
    const terminal = document.getElementById('terminal');
    const heartCanvas = document.getElementById('heartCanvas');

    // الكلمات اللي حابها تظهر وتتكرر
    const words = ["I love you", "Love you", "حبيبتي", "توجور معاك", "Mon Amour"];

    // دالة فك التشفير وبدء التأثير
    function startHeartProtocol() {
        // إخفاء واجهة النظام بالتدريج
        terminal.style.opacity = '0';
        setTimeout(() => {
            terminal.classList.add('hidden');
            heartCanvas.classList.remove('hidden');
            generateHeart();
        }, 1000);
    }

    decryptBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startHeartProtocol();
    });

    document.body.addEventListener('click', () => {
        if (!terminal.classList.contains('hidden')) {
            startHeartProtocol();
        }
    });

    // دالة لتوليد الكلمات على شكل قلب
    function generateHeart() {
        const totalElements = 280; // عدد الكلمات اللي تشكل القلب (تقدر تزيد فيها)
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // تحديد حجم القلب حسب شاشة الجهاز
        const scale = Math.min(width, height) / 32; 

        for (let i = 0; i < totalElements; i++) {
            // توزيع الزوايا بانتظام من 0 لـ 2π
            const t = (i / totalElements) * Math.PI * 2; 

            // المعادلة الرياضية للقلب
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

            // حساب الإحداثيات في وسط الشاشة
            const posX = width / 2 + x * scale;
            const posY = height / 2 + y * scale;

            // إنشاء عنصر النص
            const textNode = document.createElement('div');
            textNode.classList.add('love-text');
            
            // اختيار كلمة عشوائية من القائمة
            textNode.innerText = words[Math.floor(Math.random() * words.length)];

            // تحديد الموضع العشوائي الأولي (باش تجي طائرة من الوسط أو الأطراف)
            textNode.style.left = `${width / 2}px`;
            textNode.style.top = `${height / 2}px`;
            textNode.style.opacity = '0';
            
            // إضافة عشوائية خفيفة في الألوان والأحجام لجمالية أكبر
            if (i % 3 === 0) textNode.style.color = '#ff6699';
            if (i % 5 === 0) textNode.style.color = '#ff0033';
            textNode.style.fontSize = `${Math.floor(Math.random() * 4) + 10}px`;

            heartCanvas.appendChild(textNode);

            // تحريك الكلمة إلى مكانها المخصص في شكل القلب بالتدريج
            setTimeout(() => {
                textNode.style.transition = `all ${Math.random() * 1.5 + 1}s cubic-bezier(0.25, 1, 0.5, 1)`;
                textNode.style.left = `${posX + (Math.random() * 20 - 10)}px`; // عشوائية خفيفة باش ما يجيش الخط حاد بزاف
                textNode.style.top = `${posY + (Math.random() * 20 - 10)}px`;
                textNode.style.opacity = `${Math.random() * 0.4 + 0.6}`; // شفافية متغيرة
            }, i * 8); // تأثير التتابع (تظهر كلمة وراء كلمة بسرعة)
        }
    }
});