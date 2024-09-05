import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { Typography } from '@alfalab/core-components/typography';
import { animated, useSpring } from '@react-spring/web';
import { useCallback, useEffect, useState } from 'react';
import braslet from './assets/braslet.png';
import brelok from './assets/brelok.png';
import chehol from './assets/chehol.png';
import kolco from './assets/kolco.png';
import kulon from './assets/kulon.png';
import psMain from './assets/ps_main.png';
import { BoxItem } from './box-item/BoxItem';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { useEventListener } from './useEventListener';

const data = [
  {
    colors: ['#AA2530', '#2C2D31'],
    img: brelok,
    imgBg: '#F9DFE0',
    price: 5000,
    title: 'Кожаный брелок',
  },
  {
    colors: ['#AA2530', '#2C2D31'],
    img: chehol,
    imgBg: '#A3A7B7',
    price: 5000,
    title: 'Чехол на смартфон',
  },
  {
    colors: ['#AA2530', '#2C2D31', '#8F795F'],
    img: braslet,
    imgBg: '#DAD4CF',
    price: 5000,
    title: 'Тканевый браслет',
  },
  {
    colors: ['#FFFFFF', '#2C2D31', '#F9DFE0'],
    img: kolco,
    imgBg: '#CFD9DA',
    price: 5000,
    title: 'Керамическое кольцо',
  },
  {
    colors: [],
    img: kulon,
    imgBg: '#DACFCF',
    price: 5000,
    title: 'Кулон',
  },
];

export const App = () => {
  const [checkedItem, setChecked] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');

  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [onTop, setOnTop] = useState(true);
  const springs = useSpring({
    from: { bottom: -200 },
    to: { bottom: onTop ? -200 : 0 },
  });

  useEffect(() => {
    setOnTop(document.documentElement.scrollTop === 0);
  }, []);
  useEventListener('scroll', () => setOnTop(document.documentElement.scrollTop <= 250));

  const submit = useCallback(() => {
    if (!checkedItem) {
      setError('Выберите один из вариантов');
      return;
    }

    setLoading(true);
    setThx(true);
    setLoading(false);
    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    //   setThx(true);
    //   setLoading(false);
    // });
  }, [checkedItem]);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.imgBox}>
          <div className={appSt.imgBoxText}>
            <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="large" font="system" weight="bold">
              Плати играючи
            </Typography.TitleResponsive>
            <Typography.Text color="secondary" view="primary-medium">
              Как и стикер, только не стикер
            </Typography.Text>
          </div>
          <img src={psMain} height={168} width="100%" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
        </div>
        <Typography.TitleResponsive style={{ marginTop: '1.5rem' }} tag="h2" view="small" font="system" weight="semibold">
          Доступные варианты:
        </Typography.TitleResponsive>

        {data.map(d => (
          <BoxItem
            key={d.title}
            checked={checkedItem === d.title}
            colors={d.colors}
            img={d.img}
            imgBg={d.imgBg}
            onClick={() => {
              setError('');
              setChecked(d.title);
            }}
            price={d.price}
            title={d.title}
          />
        ))}
      </div>
      <Gap size={128} />

      <animated.div className={appSt.bottomBtn} style={springs}>
        <ButtonMobile loading={loading} block view="primary" onClick={submit} className={appSt.hint} hint={err}>
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="small" weight="bold">
                Оформить
              </Typography.TitleResponsive>
              <Typography.Text color="secondary-inverted" tag="p" view="primary-small" defaultMargins={false}>
                Сможете забрать в офисе или вызвать курьера по готовности.
              </Typography.Text>
            </div>
            <CDNIcon name="glyph_chevron-right_m" />
          </div>
        </ButtonMobile>
      </animated.div>
    </>
  );
};
