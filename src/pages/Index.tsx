import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const BIKE_IMG_1 = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/files/f9391804-d33f-4bfc-8ab5-5362d8578e46.jpg";
const BIKE_IMG_2 = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/files/8e6b5c2e-e3df-491d-ad22-a6de27b39f66.jpg";

const NAV_LINKS = [
  { label: "Каталог", href: "#catalog" },
  { label: "Характеристики", href: "#specs" },
  { label: "Галерея", href: "#gallery" },
  { label: "Тест-драйв", href: "#testdrive" },
  { label: "Блог", href: "#blog" },
  { label: "О компании", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

const MODELS = [
  {
    name: "ВЕЛСА X1",
    tag: "ГОРОДСКОЙ",
    power: "750 Вт",
    speed: "45 км/ч",
    range: "80 км",
    price: "от 89 900 ₽",
    img: BIKE_IMG_1,
    accent: "Городской хищник",
    color: "#D4FF00",
  },
  {
    name: "ВЕЛСА X3 PRO",
    tag: "СПОРТИВНЫЙ",
    power: "1500 Вт",
    speed: "60 км/ч",
    range: "120 км",
    price: "от 149 900 ₽",
    img: BIKE_IMG_2,
    accent: "Максимальная мощь",
    color: "#FF4D00",
  },
  {
    name: "ВЕЛСА GT",
    tag: "ЭНДУРО",
    power: "2000 Вт",
    speed: "70 км/ч",
    range: "150 км",
    price: "от 199 900 ₽",
    img: BIKE_IMG_1,
    accent: "Любая дорога",
    color: "#00D4FF",
  },
];

const SPECS = [
  { label: "Мощность мотора", value: "до 2000 Вт", icon: "Zap" },
  { label: "Максимальная скорость", value: "70 км/ч", icon: "Gauge" },
  { label: "Запас хода", value: "до 150 км", icon: "Battery" },
  { label: "Зарядка", value: "4–6 часов", icon: "PlugZap" },
  { label: "Масса", value: "от 22 кг", icon: "Weight" },
  { label: "Тормоза", value: "Гидравлические", icon: "CircleDot" },
  { label: "Подвеска", value: "Двойная рычажная", icon: "Cpu" },
  { label: "Гарантия", value: "2 года", icon: "ShieldCheck" },
];

const BLOG_POSTS = [
  {
    tag: "ОБЗОР",
    date: "15 апр 2026",
    title: "ВЕЛСА X3 PRO против конкурентов: кто быстрее?",
    text: "Провели независимое тестирование на треке. Результаты поразили даже нас.",
    read: "5 мин",
  },
  {
    tag: "ТЕХНОЛОГИИ",
    date: "8 апр 2026",
    title: "Новое поколение аккумуляторов Li-NMC: что изменилось",
    text: "Объясняем простым языком, почему наши байки едут дальше и заряжаются быстрее.",
    read: "7 мин",
  },
  {
    tag: "ТЕСТ-ДРАЙВ",
    date: "1 апр 2026",
    title: "Горные тропы Алтая на ВЕЛСА GT: репортаж",
    text: "500 километров по бездорожью. Один байк. Видео и фото внутри.",
    read: "10 мин",
  },
];

function useIntersection(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState({ name: "", phone: "", model: "ВЕЛСА X1" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "catalog", "specs", "gallery", "testdrive", "blog", "about", "contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen font-body overflow-x-hidden">

      {/* ───── TICKER ───── */}
      <div className="bg-neon text-[#0A0A0A] py-1.5 overflow-hidden relative z-50">
        <div className="flex animate-ticker whitespace-nowrap">
          {Array(2).fill(null).map((_, i) => (
            <span key={i} className="font-heading font-semibold text-xs tracking-[0.2em] uppercase flex items-center gap-8 pr-8">
              {["ВЕЛСА — СКОРОСТЬ БЕЗ КОМПРОМИССОВ", "НОВЫЕ МОДЕЛИ 2026", "ТЕСТ-ДРАЙВ В МОСКВЕ И СПБ", "ГАРАНТИЯ 2 ГОДА", "БЕСПЛАТНАЯ ДОСТАВКА ПО РФ", "ОФИЦИАЛЬНЫЙ ДИЛЕР"].map((t, j) => (
                <span key={j} className="flex items-center gap-3">
                  <span className="w-1 h-1 bg-[#0A0A0A] rounded-full inline-block" />
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ───── NAV ───── */}
      <nav className="fixed top-6 left-0 right-0 z-40 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neon flex items-center justify-center">
              <span className="font-display text-[#0A0A0A] text-sm leading-none">В</span>
            </div>
            <span className="font-display text-2xl tracking-widest text-white">ВЕЛСА</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-[#111]/80 backdrop-blur-md border border-white/5 rounded-none px-2 py-1.5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`font-heading text-xs tracking-[0.15em] uppercase px-4 py-2 transition-all duration-200
                  ${activeSection === l.href.slice(1)
                    ? "text-neon bg-neon/10"
                    : "text-white/60 hover:text-white"
                  }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#testdrive"
            className="hidden lg:flex items-center gap-2 bg-neon text-[#0A0A0A] font-heading font-semibold text-xs tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-neon/90 transition-all"
          >
            <Icon name="Calendar" size={14} />
            Тест-драйв
          </a>

          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden mt-2 bg-[#111]/95 backdrop-blur-md border border-white/5 p-4 mx-0">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block font-heading text-sm tracking-widest uppercase py-3 text-white/70 hover:text-neon border-b border-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="#testdrive" className="block mt-4 bg-neon text-[#0A0A0A] font-heading font-semibold text-xs tracking-widest uppercase text-center py-3">
              Записаться на тест-драйв
            </a>
          </div>
        )}
      </nav>

      {/* ───── HERO ───── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden speed-lines-bg">
        <div className="absolute inset-0">
          <img
            src={BIKE_IMG_1}
            alt="ВЕЛСА"
            className="w-full h-full object-cover opacity-30"
            style={{ filter: "saturate(0.3) contrast(1.2)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/60" />
        </div>

        {/* Speed lines decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent animate-speed-line"
              style={{
                top: `${15 + i * 10}%`,
                left: "20%",
                right: 0,
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "both",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
          <div className="max-w-3xl">
            <div className="section-tag animate-fade-up opacity-0-init" style={{ animationFillMode: "both" }}>
              Моторвелосипеды нового поколения
            </div>
            <h1
              className="font-display text-[clamp(4rem,12vw,10rem)] leading-none tracking-wider text-white animate-fade-up opacity-0-init animate-delay-100"
              style={{ animationFillMode: "both" }}
            >
              ВЕЛСА
            </h1>
            <div
              className="flex items-center gap-4 mb-6 animate-fade-up opacity-0-init animate-delay-200"
              style={{ animationFillMode: "both" }}
            >
              <div className="h-px w-16 bg-neon" />
              <span className="font-heading text-neon text-sm tracking-widest uppercase">Скорость. Мощь. Свобода.</span>
            </div>
            <p
              className="font-body text-white/60 text-lg max-w-lg leading-relaxed mb-10 animate-fade-up opacity-0-init animate-delay-300"
              style={{ animationFillMode: "both" }}
            >
              Электрические моторвелосипеды для тех, кто не идёт на компромисс. 
              Городские улицы, горные тропы, открытые трассы — ВЕЛСА справится везде.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up opacity-0-init animate-delay-400"
              style={{ animationFillMode: "both" }}
            >
              <a
                href="#catalog"
                className="group flex items-center gap-3 bg-neon text-[#0A0A0A] font-heading font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-neon/90 transition-all animate-pulse-neon"
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#gallery"
                className="flex items-center gap-3 border border-white/20 text-white font-heading font-medium tracking-[0.15em] uppercase px-8 py-4 hover:border-neon hover:text-neon transition-all"
              >
                <Icon name="Play" size={16} />
                Видео-обзоры
              </a>
            </div>

            <div
              className="flex gap-10 mt-14 animate-fade-up opacity-0-init animate-delay-500"
              style={{ animationFillMode: "both" }}
            >
              {[["3", "модели"], ["70+", "км/ч"], ["150", "км пробег"], ["5000+", "клиентов"]].map(([num, lbl]) => (
                <div key={lbl}>
                  <div className="font-display text-3xl text-neon leading-none">{num}</div>
                  <div className="font-body text-white/40 text-xs uppercase tracking-widest mt-1">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="font-heading text-xs tracking-widest uppercase">Скролл</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ───── CATALOG ───── */}
      <section id="catalog" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimSection>
            <div className="flex items-end justify-between mb-14">
              <div>
                <div className="section-tag">Линейка моделей</div>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider text-white">
                  КАТАЛОГ
                </h2>
              </div>
              <p className="hidden md:block font-body text-white/40 max-w-xs text-sm leading-relaxed text-right">
                Три модели для разных задач. Каждая — с двухлетней гарантией и бесплатной доставкой по России.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-0.5">
            {MODELS.map((model, i) => (
              <AnimSection key={model.name} className={`animate-delay-${(i + 1) * 100}`}>
                <div className="group bg-[#111] neon-border-hover cursor-pointer relative overflow-hidden">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={model.img}
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ filter: "saturate(0.5) contrast(1.1)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                    <div
                      className="absolute top-4 left-4 font-heading text-xs tracking-widest uppercase px-3 py-1"
                      style={{ backgroundColor: model.color, color: "#0A0A0A" }}
                    >
                      {model.tag}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="font-body text-white/40 text-xs tracking-widest uppercase mb-1">{model.accent}</div>
                    <h3 className="font-display text-3xl tracking-wider text-white mb-4">{model.name}</h3>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { label: "Мощность", val: model.power },
                        { label: "Скорость", val: model.speed },
                        { label: "Пробег", val: model.range },
                      ].map((s) => (
                        <div key={s.label} className="bg-[#0A0A0A] p-3 text-center">
                          <div className="font-heading text-sm font-semibold text-white">{s.val}</div>
                          <div className="font-body text-white/30 text-[10px] uppercase tracking-wider mt-0.5">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl text-neon">{model.price}</span>
                      <button className="flex items-center gap-2 font-heading text-xs tracking-widest uppercase text-white/60 hover:text-neon transition-colors group">
                        Подробнее
                        <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SPECS ───── */}
      <section id="specs" className="py-24 px-6 bg-[#0D0D0D] relative speed-lines-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="section-tag">Технические данные</div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider text-white mb-6">
                ХАРАК<br />ТЕРИСТИКИ
              </h2>
              <p className="font-body text-white/50 leading-relaxed mb-8">
                Каждый компонент тщательно подобран инженерами ВЕЛСА. 
                Максимальная производительность при минимальном обслуживании.
              </p>
              <a
                href="#testdrive"
                className="inline-flex items-center gap-3 bg-neon text-[#0A0A0A] font-heading font-semibold tracking-[0.15em] uppercase px-6 py-3 hover:bg-neon/90 transition-all text-sm"
              >
                <Icon name="Zap" size={16} />
                Почувствуй сам
              </a>
            </AnimSection>

            <AnimSection>
              <div className="grid grid-cols-2 gap-0.5">
                {SPECS.map((s, i) => (
                  <div
                    key={s.label}
                    className="bg-[#111] p-5 neon-border-hover group"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={s.icon} fallback="CircleAlert" size={16} className="text-neon" />
                      <span className="font-body text-white/40 text-xs uppercase tracking-wider">{s.label}</span>
                    </div>
                    <div className="font-heading text-xl font-semibold text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ───── GALLERY / VIDEO ───── */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimSection className="mb-14">
            <div className="section-tag">Видео и фото</div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider text-white">
              ГАЛЕРЕЯ
            </h2>
          </AnimSection>

          {/* Main video embed */}
          <AnimSection className="mb-4">
            <div className="relative bg-[#111] overflow-hidden" style={{ paddingBottom: "42%" }}>
              <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
                <img src={BIKE_IMG_2} alt="Видео" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <button className="w-20 h-20 bg-neon flex items-center justify-center hover:bg-neon/90 transition-all animate-pulse-neon">
                    <Icon name="Play" size={32} className="text-[#0A0A0A] ml-1" />
                  </button>
                  <span className="font-heading text-white/60 tracking-widest uppercase text-sm">
                    ВЕЛСА X3 PRO — Обзор 2026
                  </span>
                </div>
              </div>
            </div>
          </AnimSection>

          <div className="grid grid-cols-3 gap-0.5">
            {[BIKE_IMG_1, BIKE_IMG_2, BIKE_IMG_1].map((img, i) => (
              <AnimSection key={i} className={`animate-delay-${(i + 1) * 100}`}>
                <div className="group relative overflow-hidden cursor-pointer" style={{ paddingBottom: "66%" }}>
                  <img
                    src={img}
                    alt={`Галерея ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ filter: "saturate(0.4) contrast(1.1)" }}
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-transparent transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-neon/90 flex items-center justify-center">
                      <Icon name={i === 1 ? "Play" : "ZoomIn"} size={20} className="text-[#0A0A0A]" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="font-heading text-[10px] tracking-widest uppercase text-neon bg-[#0A0A0A]/80 px-2 py-1">
                      {["Городской", "Видео-обзор", "Эндуро"][i]}
                    </span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TEST DRIVE ───── */}
      <section id="testdrive" className="py-24 px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 speed-lines-bg pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
          <img
            src={BIKE_IMG_1}
            alt=""
            className="w-full h-full object-cover opacity-10"
            style={{ filter: "saturate(0) contrast(1.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimSection>
              <div className="section-tag">Запись</div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider text-white mb-6">
                ТЕСТ-<br />ДРАЙВ
              </h2>
              <p className="font-body text-white/50 leading-relaxed mb-8 max-w-sm">
                Не верь на слово — почувствуй сам. Запишись на бесплатный тест-драйв 
                в Москве или Санкт-Петербурге. Профессиональный инструктор, без ограничений.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "MapPin", text: "Москва — ул. Моторная, 12" },
                  { icon: "MapPin", text: "Санкт-Петербург — пр. Скоростной, 7" },
                  { icon: "Clock", text: "Пн–Вс, 10:00–20:00" },
                  { icon: "CheckCircle", text: "Бесплатно, без обязательств" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/60">
                    <Icon name={item.icon} fallback="CircleAlert" size={16} className="text-neon flex-shrink-0" />
                    <span className="font-body text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              {submitted ? (
                <div className="bg-[#111] p-10 flex flex-col items-center justify-center text-center neon-border h-full min-h-[400px]">
                  <div className="w-16 h-16 bg-neon flex items-center justify-center mb-6">
                    <Icon name="CheckCheck" size={32} className="text-[#0A0A0A]" />
                  </div>
                  <h3 className="font-display text-3xl text-white tracking-wider mb-3">ЗАЯВКА ПРИНЯТА</h3>
                  <p className="font-body text-white/50 text-sm">
                    Мы свяжемся с вами в течение 30 минут для подтверждения записи.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#111] p-8 space-y-4">
                  <h3 className="font-heading text-lg tracking-widest uppercase text-white mb-6">Оставить заявку</h3>

                  <div>
                    <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Петров"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 text-white font-body px-4 py-3 focus:border-neon focus:outline-none transition-colors placeholder:text-white/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 text-white font-body px-4 py-3 focus:border-neon focus:outline-none transition-colors placeholder:text-white/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-body text-white/40 text-xs uppercase tracking-wider block mb-2">Модель</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 text-white font-body px-4 py-3 focus:border-neon focus:outline-none transition-colors"
                    >
                      <option>ВЕЛСА X1</option>
                      <option>ВЕЛСА X3 PRO</option>
                      <option>ВЕЛСА GT</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-neon text-[#0A0A0A] font-heading font-bold tracking-[0.2em] uppercase py-4 hover:bg-neon/90 transition-all mt-2 flex items-center justify-center gap-2"
                  >
                    <Icon name="Send" size={16} />
                    Записаться на тест-драйв
                  </button>
                  <p className="font-body text-white/20 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ───── BLOG ───── */}
      <section id="blog" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimSection className="mb-14 flex items-end justify-between">
            <div>
              <div className="section-tag">Статьи и новости</div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider text-white">БЛОГ</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 font-heading text-xs tracking-widest uppercase text-white/40 hover:text-neon transition-colors">
              Все статьи <Icon name="ArrowRight" size={14} />
            </button>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-0.5">
            {BLOG_POSTS.map((post, i) => (
              <AnimSection key={i} className={`animate-delay-${(i + 1) * 100}`}>
                <article className="bg-[#111] p-6 neon-border-hover cursor-pointer h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-neon/10 text-neon font-heading text-[10px] tracking-widest uppercase px-3 py-1">
                      {post.tag}
                    </span>
                    <span className="font-body text-white/30 text-xs">{post.date}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white leading-snug mb-3 flex-grow">
                    {post.title}
                  </h3>
                  <p className="font-body text-white/40 text-sm leading-relaxed mb-4">{post.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-white/20 text-xs flex items-center gap-1">
                      <Icon name="Clock" size={12} /> {post.read} чтения
                    </span>
                    <button className="font-heading text-xs tracking-wider uppercase text-neon/60 hover:text-neon flex items-center gap-1 transition-colors">
                      Читать <Icon name="ArrowRight" size={12} />
                    </button>
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── ABOUT ───── */}
      <section id="about" className="py-24 px-6 bg-[#0D0D0D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="relative">
                <img
                  src={BIKE_IMG_2}
                  alt="О компании"
                  className="w-full object-cover"
                  style={{ filter: "saturate(0.5) contrast(1.1)", height: "500px" }}
                />
                <div className="absolute bottom-6 left-6 bg-neon p-5">
                  <div className="font-display text-4xl text-[#0A0A0A] leading-none">2018</div>
                  <div className="font-heading text-xs tracking-widest uppercase text-[#0A0A0A]/70">Год основания</div>
                </div>
              </div>
            </AnimSection>

            <AnimSection>
              <div className="section-tag">О нас</div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-wider text-white mb-6">
                О КОМПАНИИ
              </h2>
              <p className="font-body text-white/60 leading-relaxed mb-6">
                ВЕЛСА — российский производитель электрических моторвелосипедов с 2018 года. 
                Мы создаём технику, которая меняет отношение к движению: надёжную, мощную и 
                доступную каждому.
              </p>
              <p className="font-body text-white/40 leading-relaxed mb-10">
                Наши инженеры разрабатывают каждую деталь с нуля — от рамы до программного 
                обеспечения. 5000 довольных клиентов по всей России — наша лучшая рекомендация.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[["5000+", "Клиентов"], ["3", "Модели"], ["26", "Дилеров"]].map(([num, lbl]) => (
                  <div key={lbl} className="border-t border-neon/30 pt-4">
                    <div className="font-display text-3xl text-neon">{num}</div>
                    <div className="font-body text-white/40 text-xs uppercase tracking-wider mt-1">{lbl}</div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ───── CONTACTS ───── */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimSection className="mb-14">
            <div className="section-tag">Связаться с нами</div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wider text-white">
              КОНТАКТЫ
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0.5">
            {[
              { icon: "Phone", label: "Телефон", val: "+7 (800) 123-45-67", sub: "Бесплатно по России" },
              { icon: "Mail", label: "Email", val: "info@velsa.ru", sub: "Ответим в течение часа" },
              { icon: "MapPin", label: "Москва", val: "ул. Моторная, 12", sub: "Пн–Вс, 10:00–20:00" },
              { icon: "MapPin", label: "Санкт-Петербург", val: "пр. Скоростной, 7", sub: "Пн–Вс, 10:00–20:00" },
            ].map((c) => (
              <AnimSection key={c.label}>
                <div className="bg-[#111] p-6 neon-border-hover h-full">
                  <Icon name={c.icon} fallback="CircleAlert" size={20} className="text-neon mb-4" />
                  <div className="font-body text-white/30 text-xs uppercase tracking-widest mb-2">{c.label}</div>
                  <div className="font-heading text-base font-semibold text-white mb-1">{c.val}</div>
                  <div className="font-body text-white/30 text-xs">{c.sub}</div>
                </div>
              </AnimSection>
            ))}
          </div>

          <AnimSection className="mt-0.5">
            <div className="bg-neon p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl text-[#0A0A0A] tracking-wider">СТАТЬ ДИЛЕРОМ</h3>
                <p className="font-body text-[#0A0A0A]/60 text-sm mt-1">Открой свою точку продаж ВЕЛСА в своём городе</p>
              </div>
              <button className="flex-shrink-0 flex items-center gap-2 bg-[#0A0A0A] text-neon font-heading font-bold tracking-widest uppercase px-8 py-4 hover:bg-[#111] transition-colors">
                <Icon name="Handshake" size={18} />
                Оставить заявку
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-neon flex items-center justify-center">
              <span className="font-display text-[#0A0A0A] text-xs leading-none">В</span>
            </div>
            <span className="font-display text-xl tracking-widest text-white">ВЕЛСА</span>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="font-body text-white/30 hover:text-white text-xs uppercase tracking-wider transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex gap-3">
            {["Instagram", "Youtube", "MessageCircle"].map((ico) => (
              <button key={ico} className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-neon hover:text-neon transition-all">
                <Icon name={ico} fallback="CircleAlert" size={16} />
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="font-body text-white/20 text-xs">© 2026 ВЕЛСА. Все права защищены.</span>
          <span className="font-body text-white/20 text-xs">Политика конфиденциальности · Условия использования</span>
        </div>
      </footer>
    </div>
  );
}