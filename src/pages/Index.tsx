import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/bucket/c128cbea-fb6f-4308-a3c7-60c1ca282386.JPG";
const BIKE_PRODUCT = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/bucket/11617d62-b378-476a-8f0d-c5980dc3084a.JPG";
const BIKE_PROMO = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/bucket/955fdfeb-b03a-43ec-8b89-6a5311e13858.JPG";
const BIKE_INFOGRAPHIC = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/bucket/78841b44-fc3f-4402-a9fa-6d34ca09c3e1.JPG";
const TANK_IMG = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/bucket/0faf2b8d-f07f-4987-9c84-856c48c1eec0.JPG";
const ENGINE_IMG = "https://cdn.poehali.dev/projects/bdb971cd-983a-480d-9dc0-ed1ce8b46e0d/bucket/955fdfeb-b03a-43ec-8b89-6a5311e13858.JPG";

const NAV_LINKS = [
  { label: "О товаре", href: "#about" },
  { label: "Характеристики", href: "#specs" },
  { label: "Галерея", href: "#gallery" },
  { label: "Комплектация", href: "#kit" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SPECS = [
  { label: "Двигатель", value: "F80 80сс 2-тактный", icon: "Settings" },
  { label: "Мощность", value: "3.5 л.с. / 2.2 кВт", icon: "Zap" },
  { label: "Макс. скорость", value: "50 км/ч", icon: "Gauge" },
  { label: "Расход топлива", value: "2.5 л/100 км", icon: "Fuel" },
  { label: "Топливо", value: "Бензин АИ-92 + масло", icon: "Droplets" },
  { label: "Объём бака", value: "1.5 литра", icon: "Container" },
  { label: "Тип трансмиссии", value: "Цепная передача", icon: "Link" },
  { label: "Управление", value: "Ручка газа + сцепление", icon: "Wrench" },
];

const FEATURES = [
  {
    icon: "Zap",
    title: "Мощный двигатель",
    text: "2-тактный двигатель F80 объёмом 80сс развивает 3.5 л.с. — разгоняет до 50 км/ч и уверенно едет в горку.",
  },
  {
    icon: "Fuel",
    title: "Экономичный расход",
    text: "Всего 2.5 литра на 100 км. На одном баке проедете 60 км, заправляясь за копейки на любой АЗС.",
  },
  {
    icon: "Wrench",
    title: "Простое обслуживание",
    text: "Классический 2-тактный мотор ремонтируется в любом гараже. Запчасти доступны по всей России.",
  },
  {
    icon: "Shield",
    title: "Надёжная конструкция",
    text: "Стальная рама усилена для мотора. Цепная передача, дисковые тормоза, полный привод.",
  },
];

const KIT_ITEMS = [
  "Двигатель F80 (80сс, 2-тактный)",
  "Бензобак 1.5 л с краником",
  "Приводная цепь и звезда",
  "Ручка газа с тросом",
  "Рычаг сцепления с тросом",
  "Глушитель хромированный",
  "Крепёжный комплект (болты, хомуты)",
  "Карбюратор с фильтром",
  "CDI-блок зажигания",
  "Инструкция по установке на русском",
];

const REVIEWS = [
  {
    name: "Алексей М.",
    city: "Москва",
    stars: 5,
    text: "Собрал за 3 часа по инструкции, всё понятно. Едет отлично, расход реально маленький. Соседи завидуют!",
    date: "18 апр 2026",
  },
  {
    name: "Дмитрий К.",
    city: "Краснодар",
    stars: 5,
    text: "Пользуюсь полгода, никаких проблем. На работу езжу вместо машины — экономия огромная. Очень доволен.",
    date: "10 апр 2026",
  },
  {
    name: "Сергей Т.",
    city: "Екатеринбург",
    stars: 4,
    text: "Хороший мотор, мощный. Поставил за выходные. Единственное — инструкция местами непонятна, но разобрался.",
    date: "3 апр 2026",
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
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "specs", "gallery", "kit", "reviews", "contacts"];
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
    <div className="bg-[#0C0B09] text-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ───── TICKER ───── */}
      <div className="bg-[#1A1200] text-[#C8973A] border-b border-[#C8973A]/20 py-1.5 overflow-hidden relative z-50">
        <div className="flex whitespace-nowrap" style={{ animation: "ticker 28s linear infinite" }}>
          {Array(3).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-xs font-semibold tracking-[0.18em] uppercase">
              {["МОТОБАЙК F80 — В НАЛИЧИИ", "БЕСПЛАТНАЯ ДОСТАВКА ПО РФ", "БЫСТРАЯ СБОРКА 2–3 ЧАСА", "РАСХОД 2.5 Л/100 КМ", "СКОРОСТЬ ДО 50 КМ/Ч", "ГАРАНТИЯ 1 ГОД"].map((t, j) => (
                <span key={j} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#C8973A] rounded-full inline-block" />
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ───── NAV ───── */}
      <nav className="fixed top-6 left-0 right-0 z-40 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#C8973A] flex items-center justify-center">
              <Icon name="Bike" size={20} className="text-[#0C0B09]" />
            </div>
            <span className="font-bold text-white tracking-widest uppercase text-sm">МотоВелс</span>
          </a>

          <div className="hidden lg:flex items-center gap-1 bg-[#141210]/90 backdrop-blur-md border border-[#C8973A]/10 px-2 py-1.5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-xs tracking-[0.12em] uppercase px-4 py-2 transition-all duration-200 font-medium
                  ${activeSection === l.href.slice(1)
                    ? "text-[#E8B86D] bg-[#C8973A]/10"
                    : "text-white/60 hover:text-white"
                  }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contacts"
            className="hidden lg:flex items-center gap-2 bg-[#C8973A] text-[#0C0B09] font-bold text-xs tracking-[0.12em] uppercase px-5 py-2.5 hover:bg-[#E8B86D] transition-all"
          >
            <Icon name="ShoppingCart" size={14} />
            Купить
          </a>

          <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden mt-2 bg-[#141210]/97 backdrop-blur-md border border-[#C8973A]/15 p-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm tracking-widest uppercase py-3 text-white/70 hover:text-[#E8B86D] border-b border-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="#contacts" className="block mt-4 bg-[#C8973A] text-[#0C0B09] font-bold text-xs tracking-widest uppercase text-center py-3">
              Купить сейчас
            </a>
          </div>
        )}
      </nav>

      {/* ───── HERO ───── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={BIKE_PROMO}
            alt="Мотобайк"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0B09] via-[#0C0B09]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B09] via-transparent to-[#0C0B09]/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#C8973A]/15 border border-[#C8973A]/30 px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 bg-[#C8973A] rounded-full animate-pulse" />
              <span className="text-[#C8973A] text-xs tracking-widest uppercase font-semibold">В наличии · Доставка по РФ</span>
            </div>

            <h1 className="font-black text-white leading-none mb-4" style={{ fontSize: "clamp(3rem,8vw,6.5rem)", letterSpacing: "-0.02em" }}>
              БЕНЗИ<span className="text-[#C8973A]">НО</span>ВЫЙ<br />
              МОТО<span className="text-[#C8973A]">БАЙК</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
              Двигатель F80 · 80сс · 2-такт · 3.5 л.с.<br />
              Скорость до <strong className="text-white">50 км/ч</strong> · Расход <strong className="text-white">2.5 л/100 км</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contacts"
                className="inline-flex items-center justify-center gap-2 bg-[#C8973A] text-[#0C0B09] font-bold tracking-wider uppercase px-8 py-4 hover:bg-[#E8B86D] transition-all text-sm"
              >
                <Icon name="ShoppingCart" size={16} />
                Купить сейчас
              </a>
              <a
                href="#specs"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold tracking-wider uppercase px-8 py-4 hover:border-[#C8973A] hover:text-[#C8973A] transition-all text-sm"
              >
                <Icon name="List" size={16} />
                Характеристики
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8">
              {[
                { val: "50", unit: "км/ч", label: "макс. скорость" },
                { val: "2.5", unit: "л/100км", label: "расход" },
                { val: "3.5", unit: "л.с.", label: "мощность" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-[#C8973A]">{s.val}<span className="text-sm text-white/60 font-normal ml-1">{s.unit}</span></div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1.5 opacity-40">
            <span className="text-white text-[10px] tracking-widest uppercase">Листай вниз</span>
            <Icon name="ChevronDown" size={16} className="text-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* ───── ABOUT ───── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimSection className="mb-14">
            <div className="inline-flex items-center gap-2 text-[#C8973A] text-xs tracking-widest uppercase font-semibold mb-4">
              <span className="w-8 h-px bg-[#C8973A]" />
              О товаре
            </div>
            <h2 className="font-black leading-none tracking-tight text-white" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
              ВЕЛОСИПЕД С ДВИГАТЕЛЕМ<br />
              <span className="text-[#C8973A]">ВНУТРЕННЕГО СГОРАНИЯ</span>
            </h2>
          </AnimSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <AnimSection>
              <img
                src={BIKE_INFOGRAPHIC}
                alt="Мотовелосипед с описанием"
                className="w-full object-contain rounded"
              />
            </AnimSection>
            <AnimSection>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Мотовелосипед — это обычный велосипед с установленным бензиновым двигателем F80. 
                Вы получаете свободу передвижения без пробок, минимальные расходы на топливо и 
                возможность ехать даже там, где нет зарядки.
              </p>
              <div className="space-y-4">
                {FEATURES.map((f) => (
                  <div key={f.title} className="flex gap-4 p-4 bg-[#141210] border-l-2 border-[#C8973A]">
                    <div className="w-10 h-10 bg-[#C8973A]/15 flex items-center justify-center shrink-0">
                      <Icon name={f.icon} fallback="CircleAlert" size={18} className="text-[#C8973A]" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm mb-1">{f.title}</div>
                      <div className="text-white/50 text-sm leading-relaxed">{f.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ───── SPECS ───── */}
      <section id="specs" className="py-24 px-6 bg-[#100F0D]">
        <div className="max-w-6xl mx-auto">
          <AnimSection className="mb-14">
            <div className="inline-flex items-center gap-2 text-[#C8973A] text-xs tracking-widest uppercase font-semibold mb-4">
              <span className="w-8 h-px bg-[#C8973A]" />
              Технические данные
            </div>
            <h2 className="font-black leading-none tracking-tight text-white" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
              ХАРАКТЕРИСТИКИ
            </h2>
          </AnimSection>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="grid grid-cols-2 gap-0.5">
                {SPECS.map((s) => (
                  <div key={s.label} className="bg-[#141210] p-5 group hover:bg-[#1C1A16] transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={s.icon} fallback="CircleAlert" size={15} className="text-[#C8973A]" />
                      <span className="text-white/40 text-[11px] uppercase tracking-wider">{s.label}</span>
                    </div>
                    <div className="font-bold text-white text-base">{s.value}</div>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="relative overflow-hidden">
                <img
                  src={ENGINE_IMG}
                  alt="Двигатель F80"
                  className="w-full object-cover rounded"
                  style={{ maxHeight: 500 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0C0B09] to-transparent">
                  <div className="text-[#C8973A] font-black text-4xl mb-1">F80</div>
                  <div className="text-white/60 text-sm">80сс · 2-тактный · 3.5 л.с.</div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ───── GALLERY ───── */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimSection className="mb-14">
            <div className="inline-flex items-center gap-2 text-[#C8973A] text-xs tracking-widest uppercase font-semibold mb-4">
              <span className="w-8 h-px bg-[#C8973A]" />
              Фотографии
            </div>
            <h2 className="font-black leading-none tracking-tight text-white" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
              ГАЛЕРЕЯ
            </h2>
          </AnimSection>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { img: BIKE_PROMO, label: "Бензиновый мотобайк" },
              { img: BIKE_PRODUCT, label: "Вид сбоку" },
              { img: ENGINE_IMG, label: "Двигатель 3.5 л.с." },
              { img: TANK_IMG, label: "Бензобак" },
              { img: BIKE_INFOGRAPHIC, label: "Схема компонентов" },
              { img: HERO_IMG, label: "Смесь бензина с маслом" },
            ].map((item, i) => (
              <AnimSection key={i}>
                <div className="group relative overflow-hidden bg-[#111]" style={{ paddingBottom: "70%" }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0C0B09]/40 group-hover:bg-[#0C0B09]/10 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] tracking-widest uppercase text-[#E8B86D] bg-[#0C0B09]/80 px-2 py-1">
                      {item.label}
                    </span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── KIT ───── */}
      <section id="kit" className="py-24 px-6 bg-[#100F0D]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="inline-flex items-center gap-2 text-[#C8973A] text-xs tracking-widest uppercase font-semibold mb-4">
                <span className="w-8 h-px bg-[#C8973A]" />
                Что входит
              </div>
              <h2 className="font-black leading-none tracking-tight text-white mb-8" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
                КОМПЛЕКТ<br /><span className="text-[#C8973A]">ПОСТАВКИ</span>
              </h2>
              <div className="space-y-2">
                {KIT_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/5">
                    <div className="w-6 h-6 bg-[#C8973A]/15 flex items-center justify-center shrink-0">
                      <Icon name="Check" size={12} className="text-[#C8973A]" />
                    </div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="relative">
                <img
                  src={BIKE_PRODUCT}
                  alt="Мотобайк комплект"
                  className="w-full object-contain"
                />
                <div className="absolute top-4 right-4 bg-[#C8973A] text-[#0C0B09] px-4 py-2">
                  <div className="font-black text-2xl">F80</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider">Полный комплект</div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ───── REVIEWS ───── */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimSection className="mb-14">
            <div className="inline-flex items-center gap-2 text-[#C8973A] text-xs tracking-widest uppercase font-semibold mb-4">
              <span className="w-8 h-px bg-[#C8973A]" />
              Покупатели говорят
            </div>
            <h2 className="font-black leading-none tracking-tight text-white" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
              ОТЗЫВЫ
            </h2>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <AnimSection key={i}>
                <div className="bg-[#141210] p-6 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {Array(r.stars).fill(null).map((_, j) => (
                      <Icon key={j} name="Star" size={14} className="text-[#C8973A]" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed flex-1 mb-4">"{r.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{r.name}</div>
                      <div className="text-white/40 text-xs">{r.city}</div>
                    </div>
                    <div className="text-white/30 text-xs">{r.date}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CONTACTS / ORDER ───── */}
      <section id="contacts" className="py-24 px-6 bg-[#100F0D] relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
          <img
            src={BIKE_PROMO}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100F0D] via-[#100F0D]/60 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimSection>
              <div className="inline-flex items-center gap-2 text-[#C8973A] text-xs tracking-widest uppercase font-semibold mb-4">
                <span className="w-8 h-px bg-[#C8973A]" />
                Заказать
              </div>
              <h2 className="font-black leading-none tracking-tight text-white mb-6" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
                ОФОРМИТЬ<br /><span className="text-[#C8973A]">ЗАКАЗ</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 max-w-sm">
                Оставьте заявку — мы свяжемся в течение 30 минут, уточним детали и оформим доставку по всей России.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { icon: "Truck", text: "Доставка по всей России — Почта РФ, СДЭК, транспортные компании" },
                  { icon: "Clock", text: "Срок доставки 3–10 рабочих дней" },
                  { icon: "Shield", text: "Гарантия 1 год на двигатель" },
                  { icon: "MessageCircle", text: "Поддержка и консультация по установке" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#C8973A]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name={item.icon} fallback="CircleAlert" size={14} className="text-[#C8973A]" />
                    </div>
                    <span className="text-white/60 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              {submitted ? (
                <div className="bg-[#141210] p-10 flex flex-col items-center justify-center text-center h-full min-h-80">
                  <div className="w-16 h-16 bg-[#C8973A] flex items-center justify-center mb-6">
                    <Icon name="Check" size={32} className="text-[#0C0B09]" />
                  </div>
                  <h3 className="font-black text-2xl text-white mb-3">Заявка принята!</h3>
                  <p className="text-white/50">Свяжемся с вами в течение 30 минут.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#141210] p-8 space-y-4">
                  <h3 className="font-bold text-white text-xl mb-6">Оставить заявку</h3>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-[#0C0B09] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#C8973A] transition-colors placeholder:text-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-[#0C0B09] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#C8973A] transition-colors placeholder:text-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider mb-1.5 block">Комментарий (необязательно)</label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Ваш вопрос или город доставки..."
                      rows={3}
                      className="w-full bg-[#0C0B09] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#C8973A] transition-colors placeholder:text-white/25 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#C8973A] text-[#0C0B09] font-black tracking-wider uppercase py-4 hover:bg-[#E8B86D] transition-all text-sm"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-white/30 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="py-8 px-6 bg-[#0A0908] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#C8973A] flex items-center justify-center">
              <Icon name="Bike" size={15} className="text-[#0C0B09]" />
            </div>
            <span className="font-bold text-white/80 tracking-widest uppercase text-xs">МотоВелс</span>
          </div>
          <p className="text-white/30 text-xs">© 2026 МотоВелс. Бензиновые мотобайки F80</p>
          <div className="flex items-center gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-white/30 hover:text-[#C8973A] text-xs transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
