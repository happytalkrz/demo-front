export const summaries = [
    {
        id: 1,
        title: "배송 문의 상담 요약",
        content: {
            mainIssue: "고객의 제품 배송이 지연되고 있음. 주문 번호 123456789 조회 결과 재고 부족 상태.",
            result: "이번 주 중 출고 예정 안내",
            nextAction: "빠른 처리 약속 및 사과"
        }
    },
    {
        id: 2,
        title: "환불 요청 상담 요약",
        content: {
            mainIssue: "제품 색상 및 크기가 이미지와 달라 고객이 환불 희망",
            result: "환불 절차 안내 (마이페이지 > 주문내역 > 환불 요청)",
            nextAction: "회수 접수 후 영업일 기준 3일 이내 환불 처리 예정"
        }
    },
    {
        id: 3,
        title: "AS 요청 상담 요약",
        content: {
            mainIssue: "구매 2주 차 전자제품 고장으로 AS 요청 (XYZ-300, 5월 2일 구매)",
            result: "1년 무상 A/S 가능 확인 및 택배 접수 안내",
            nextAction: "택배 수거 접수 및 방문 전 문자 안내 예정"
        }
    }
];
// 상담 ID와 요약 ID를 연결하는 헬퍼 함수
export const getSummaryByConsultationId = (consultationId) => {
    const summaryMap = {
        'CONS-001': 1,
        'CONS-002': 2,
        'CONS-003': 3
    };
    const summaryId = summaryMap[consultationId];
    return summaries.find(summary => summary.id === summaryId);
};
