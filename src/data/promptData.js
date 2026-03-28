export const initialPrompts = [
    {
        id: 1,
        name: '상담 중 요약',
        content: '고객과의 상담 중 핵심 내용을 요약해주세요. 주요 문제점, 고객의 요구사항, 제안된 해결책을 중심으로 간결하게 정리해주세요.',
        lastModified: '-',
        modifiedBy: '-',
        status: '기본 프롬프트 사용 중',
        isDefault: true,
    },
    {
        id: 2,
        name: '상담 종료 요약',
        content: '상담이 종료된 후, 전체 상담 내용을 종합하여 요약해주세요. 고객의 문제 해결 여부, 후속 조치 사항, 고객 만족도를 포함해주세요.',
        lastModified: '2025.04.22 09:15',
        modifiedBy: '박관리',
        status: '커스텀 프롬프트 사용 중',
        isDefault: false,
    },
    {
        id: 3,
        name: '감정 분석',
        content: '고객의 대화 내용에서 감정 상태를 분석해주세요. 긍정/부정/중립으로 분류하고, 주요 감정 키워드를 추출해주세요.',
        lastModified: '2025.04.20 14:30',
        modifiedBy: '김상담',
        status: '커스텀 프롬프트 사용 중',
        isDefault: false,
    },
    {
        id: 4,
        name: '문의 분류',
        content: '고객 문의를 카테고리별로 분류해주세요. 기술문의, 서비스문의, 불만사항, 제안사항 중 해당하는 분류를 선택하고 이유를 설명해주세요.',
        lastModified: '-',
        modifiedBy: '-',
        status: '기본 프롬프트 사용 중',
        isDefault: true,
    },
];
export const statusOptions = [
    { value: '기본 프롬프트 사용 중', label: '기본 프롬프트 사용 중' },
    { value: '커스텀 프롬프트 사용 중', label: '커스텀 프롬프트 사용 중' },
];
