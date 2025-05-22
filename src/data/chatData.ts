import { ChatData } from '../types/chat';

export const chatData: ChatData[] = [
  {
    "title": "배송 문의",
    "dialogue": [
      { "role": "customer", "message": "안녕하세요, 지난주에 주문한 제품이 아직 도착하지 않아서 문의드립니다. 배송 조회해도 계속 준비 중이라고만 나옵니다." },
      { "role": "counselor", "message": "안녕하세요 고객님, 불편을 드려 죄송합니다. 주문번호 알려주시면 바로 확인해드리겠습니다." },
      { "role": "customer", "message": "주문번호는 123456789 입니다." },
      { "role": "counselor", "message": "확인해보니 해당 제품은 재고 부족으로 인해 출고가 지연되고 있었습니다. 이번 주 중으로 출고될 예정입니다." },
      { "role": "customer", "message": "그렇군요. 빠른 출고 부탁드립니다. 배송이 늦어지면 일정에 차질이 생겨서요." },
      { "role": "counselor", "message": "네 고객님. 최대한 빠르게 처리하도록 하겠습니다. 다시 한번 불편을 드려 죄송합니다." }
    ]
  },
  {
    "title": "환불 요청",
    "dialogue": [
      { "role": "customer", "message": "제품을 받았는데 생각했던 것과 달라서 환불하고 싶습니다. 어떻게 진행하면 될까요?" },
      { "role": "counselor", "message": "고객님, 구매하신 제품은 어떤 점이 마음에 들지 않으셨는지요? 간단히라도 알려주시면 서비스 개선에 도움이 됩니다." },
      { "role": "customer", "message": "크기와 색상이 실제 이미지와 많이 달라서 실망했습니다." },
      { "role": "counselor", "message": "죄송합니다. 환불 절차는 [마이페이지 > 주문내역 > 환불 요청] 메뉴에서 신청 가능하시며, 제품 회수 후 영업일 기준 3일 이내 환불 처리됩니다." },
      { "role": "customer", "message": "네. 그럼 지금 환불 요청하겠습니다. 기사님이 방문 수거하시는 거죠?" },
      { "role": "counselor", "message": "네 맞습니다. 회수 접수 후 1~2일 내 방문 예정입니다." }
    ]
  },
  {
    "title": "AS 요청",
    "dialogue": [
      { "role": "customer", "message": "2주 전에 산 전자제품이 갑자기 작동을 멈췄습니다. 수리를 받고 싶은데 절차가 궁금합니다." },
      { "role": "counselor", "message": "불편을 드려 죄송합니다. 구입하신 제품명과 구입일자 알려주시면 확인 후 안내드리겠습니다." },
      { "role": "customer", "message": "제품명은 XYZ-300이고 구입일은 지난 5월 2일입니다." },
      { "role": "counselor", "message": "해당 제품은 1년 무상 A/S가 가능합니다. 가까운 센터 방문 또는 택배 접수 중 어떤 방법을 원하시나요?" },
      { "role": "customer", "message": "택배 접수로 부탁드립니다. 방문은 어려울 것 같아서요." },
      { "role": "counselor", "message": "네 고객님. 택배 수거 접수해드리겠습니다. 수거 기사님 방문 전 문자 안내가 발송됩니다." }
    ]
  }
]; 