// 导航栏交互
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // 移动端关闭菜单
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// 联系表单处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 简单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 模拟发送（实际项目中需要后端支持）
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('感谢您的咨询！我们会尽快回复您。');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});

// 滚动动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 成功案例交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 项目详情按钮点击事件
    document.querySelectorAll('.project-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.dataset.project;
            showProjectDetails(projectId);
        });
    });

    // 项目演示按钮点击事件
    document.querySelectorAll('.project-demo').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.dataset.project;
            showProjectDemo(projectId);
        });
    });

    // 立即咨询按钮功能
    const consultButtons = document.querySelectorAll('.btn-nav, .btn-primary');
    consultButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// 显示项目详情
function showProjectDetails(projectId) {
    const projectDetails = {
        'tech-website': {
            title: '科技创新公司官网',
            description: '现代化响应式设计，SEO优化，高性能加载',
            features: ['响应式设计', 'SEO优化', '高性能加载', 'React框架', 'Node.js后端'],
            techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Webpack'],
            demoUrl: 'https://example.com/tech-website',
            githubUrl: 'https://github.com/eric-yk1212/tech-company-website'
        },
        'ecommerce-app': {
            title: '新零售电商小程序',
            description: '完整的电商功能，流畅的用户体验，支付集成',
            features: ['微信支付', '用户管理', '数据分析', '商品管理', '订单系统'],
            techStack: ['Vue.js', '微信小程序', '云开发', 'Node.js', 'MySQL'],
            demoUrl: 'https://example.com/ecommerce-app',
            githubUrl: 'https://github.com/eric-yk1212/ecommerce-miniprogram'
        },
        'saas-platform': {
            title: '企业级SaaS管理平台',
            description: '多租户架构，权限管理，数据可视化',
            features: ['多租户架构', '权限管理', '数据可视化', 'API集成', '报表系统'],
            techStack: ['Vue.js', 'Spring Boot', 'MySQL', 'Redis', 'Docker'],
            demoUrl: 'https://example.com/saas-platform',
            githubUrl: 'https://github.com/eric-yk1212/saas-management-platform'
        }
    };

    const project = projectDetails[projectId];
    if (project) {
        const modalHtml = `
            <div class="project-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000;">
                <div style="background: white; padding: 2rem; border-radius: 16px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                    <h3 style="margin-bottom: 1rem;">${project.title}</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">${project.description}</p>
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem;">主要功能</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${project.features.map(feature => `<span style="background: #f1f5f9; color: #2563eb; padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.8rem;">${feature}</span>`).join('')}
                        </div>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem;">技术栈</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${project.techStack.map(tech => `<span style="background: #e0f2fe; color: #0288d1; padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.8rem;">${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <a href="${project.demoUrl}" target="_blank" style="background: #2563eb; color: white; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none;">查看演示</a>
                        <a href="${project.githubUrl}" target="_blank" style="border: 1px solid #2563eb; color: #2563eb; padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none;">查看源码</a>
                        <button onclick="this.closest('.project-modal').remove()" style="background: #ef4444; color: white; padding: 0.5rem 1rem; border-radius: 8px; border: none; cursor: pointer;">关闭</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
}

// 显示项目演示
function showProjectDemo(projectId) {
    const demos = {
        'tech-website': 'https://example.com/tech-website',
        'ecommerce-app': 'https://example.com/ecommerce-app',
        'saas-platform': 'https://example.com/saas-platform'
    };

    const demoUrl = demos[projectId];
    if (demoUrl) {
        window.open(demoUrl, '_blank');
    } else {
        alert('演示链接暂不可用，请稍后重试');
    }
}

// 页面加载完成后的初始化
window.addEventListener('load', () => {
    console.log('企业官网模板加载完成 - 专业Web开发服务');
});