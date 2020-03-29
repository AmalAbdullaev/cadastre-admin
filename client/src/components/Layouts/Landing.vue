<template>
  <div class="landing__wrapper">
    <header class="landing__header">
      <nav class="landing__nav">
        <a href="#" class="landing__logo-wrapper">
          <img
            class="landing__logo"
            src="../../assets/images/logo.png"
            alt="Логотип"
          />
          <span>Кадастровый центр</span>
        </a>
        <ul class="landing__nav-list">
          <li class="landing__nav-item">
            <a class="landing__nav-link" href="#">Главная</a>
          </li>
          <li class="landing__nav-item">
            <a class="landing__nav-link" href="#landing-work">
              Как мы работаем
            </a>
          </li>
          <li class="landing__nav-item">
            <a class="landing__nav-link" href="#landing-services">Услуги</a>
          </li>
        </ul>
      </nav>
      <a href="#send-form" class="landing__btn landing__btn-header">
        <span>Оставить заявку </span>
      </a>
    </header>
    <!-- Hero -->
    <section class="landing__hero">
      <div class="landing__hero-info">
        <div>
          <h1>Кадастровые работы</h1>
          <h2>В Симферополе и Крыму</h2>
        </div>
        <button class="landing__btn" style="vertical-align:middle">
          <span>Бесплатная консультация </span>
        </button>
      </div>
      <img src="../../assets/images/bigpic.jpg" alt="" />
    </section>
    <!-- how we work -->
    <section id="landing-work" class="landing__work">
      <h2>Как мы работаем</h2>

      <ul class="landing__work-list">
        <li class="landing__work-item">
          <h3>ЗАЯВКА И ПОСТАНОВКА ЗАДАЧИ</h3>
          <p>
            Мы уточним исходные данные для работы, а также задачи, которые нужно
            решить. Назовем примерную стоимость и расскажем, что в неё входит
          </p>
        </li>
        <li class="landing__work-item">
          <h3>АНАЛИЗ ДОКУМЕНТОВ, СОГЛАСИЕ НА РАБОТУ</h3>
          <p>
            Запрашиваем документы, необходимые для разбора заявки. Определяем
            порядок работ, сроки, необходимость подготовки доверенностей,
            доступа на объект и окончательную стоимость. Составляем план работ с
            фиксированными сроками и результатами. Высылаем вам на согласование.
          </p>
        </li>
        <li class="landing__work-item">
          <h3>ПОДПИСАНИЕ ДОГОВОРА И НАЧАЛО РАБОТЫ</h3>
          <p>
            После согласования плана работ присылаем вам договор. Вместе с
            договром согласовываем техзническое задание. Подписываем его,
            выставляем счет на оплату аванса. Работу начинаем сразу после
            подписания договора, не дожидаясь, когда пройдет оплата.
          </p>
        </li>
        <li class="landing__work-item">
          <h3>ПОДГОТОВКА И ПРОВЕРКА ДОКУМЕНТОВ</h3>
          <p>
            Готовим документы для кадастрового учета и передаем их на проверку в
            Росреестр. Если решение положительное - работа закончена. Если нет -
            выясняем причины и устраняем их до тех пор, пока не поставим объект
            на кадастровый учет и не пройдет регистрацию.
          </p>
        </li>
        <li class="landing__work-item">
          <h3>ПОДПИСАНИЕ АКТОВ И ВЫСТАВЛЕНИЕ ОКОНЧАТЕЛЬНОГО СЧЕТА</h3>
          <p>
            После прохождения кадастрового учетаи регистрации прав, подписываем
            акты и выставляем окончательный счет. После завершения всегда
            остаемся на связи. Ответим на все возникшие вопросы по работе,
            которую сделали или поможем с новыми проектами.
          </p>
        </li>
      </ul>
    </section>
    <!-- Services -->
    <section id="landing-services" class="landing__services">
      <h2>Наши услуги</h2>
      <ul class="landing__services-list">
        <li class="landing__services-item">
          <img src="../../assets/images/services-1.svg" alt="" />
          <strong>от 3000 руб</strong>
          <p>Межевание земельных участков</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-2.svg" alt="" />
          <strong>Бесплатно</strong>
          <p>Консультация кадастрового инженера</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-3.svg" alt="" />
          <strong>от 15000 руб</strong>
          <p>Дачная амнистия "под ключ"</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-4.svg" alt="" />
          <strong>от 8000 руб</strong>
          <p>Топографическая съемка</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-5.svg" alt="" />
          <strong>от 4000 руб</strong>
          <p>Геодезия</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-6.svg" alt="" />
          <strong>от 1500 руб</strong>
          <p>Акт обследования недвижимости</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-7.svg" alt="" />
          <strong>от 7000 руб</strong>
          <p>Изготовление схем земельных участков и зданий</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-8.svg" alt="" />
          <strong>от 5000 руб</strong>
          <p>Раздел земельных участков и зданий</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-9.svg" alt="" />
          <strong>от 5000 руб</strong>
          <p>Регистрация права собственности</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-10.svg" alt="" />
          <strong>от 10000 руб</strong>
          <p>Архитектурный проект</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-11.svg" alt="" />
          <strong>от 10000 руб</strong>
          <p>Разрешение на строительство</p>
        </li>
        <li class="landing__services-item">
          <img src="../../assets/images/services-12.svg" alt="" />
          <strong>от 4000 руб</strong>
          <p>Кадастровый учет</p>
        </li>
      </ul>
    </section>
    <!-- Send Form -->
    <section id="send-form" class="landing__form">
      <h2>Нужна консультация?</h2>
      <h3>Оставьте заявку и мы с вами обязательно свяжемся</h3>

      <!-- FORM -->
      <form class="landing__form-wrapper" action="">
        <input type="text" name="uName" placeholder="Ваше имя" id="" />
        <input
          type="number"
          name="uPhone"
          placeholder="Номер телефона (без +)"
          id=""
        />
        <input type="text" name="uMail" placeholder="Email" id="" />
        <button
          type="submit"
          class="landing__btn landing__btn-form"
          style="vertical-align:middle"
        >
          <span>Оставить заявку </span>
        </button>
      </form>

      <img src="../../assets/images/kadik.jpg" alt="" />
    </section>
    <!-- footer -->
    <footer class="landing__footer">
      <a href="#" class="landing__logo-wrapper">
        <img
          class="landing__logo"
          src="../../assets/images/logo.png"
          alt="Логотип"
        />
        <span>Кадастровый центр</span>
      </a>
      <strong>Все права защищены</strong>
    </footer>
  </div>
</template>

<script>
export default {
  name: "landing",
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/components/_landing.scss";

ul,
li {
  list-style-type: none;
  padding-left: unset;
}
</style>
