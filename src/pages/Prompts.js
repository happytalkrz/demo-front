import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
const InstructionItem = ({ instruction, onDelete }) => {
    return (_jsxs("div", { className: "flex items-center justify-between bg-gray-50 p-3 rounded-md mb-2", children: [_jsx("p", { className: "text-sm text-gray-700", children: instruction }), _jsx("button", { onClick: onDelete, className: "text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50", children: _jsx(FiTrash2, { size: 16 }) })] }));
};
const Prompts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const promptName = location.state?.promptName || '프롬프트 설정';
    // 프롬프트 설정 상태
    const [format, setFormat] = useState('fixed');
    const [domain, setDomain] = useState('');
    const [summaryLength, setSummaryLength] = useState('');
    const [instructions, setInstructions] = useState([
        '전화번호, 이메일, 주소, 주민번호, 송장번호 등 개인정보가 포함되지 않도록 주의해주세요.'
    ]);
    const [newInstruction, setNewInstruction] = useState('');
    // 자유 형식 관련 상태
    const [freeFormatDescription, setFreeFormatDescription] = useState('이 프롬프트를 사용하는 AI의 역할을 설명해주세요.\n\nex. "당신은 고객 상담 내용을 요약하는 전문 AI 어시스턴트입니다."');
    const [freeFormatInstructions, setFreeFormatInstructions] = useState('AI가 상담 내용을 어떻게 요약해야 하는지 구체적으로 작성해주세요.\n하나의 문장에는 하나의 지시사항만 입력해주세요. 여러 지시사항을 한 문장에 작으면 AI가 정확하게 인식하지 못할 수 있습니다.\n\nex1) "고객 요청 -> 상담사 응대 -> 처리 결과 순으로 요약해주세요."\nex2) "개인정보(전화번호, 주소 등)는 제거하고, 간결하게 작성해주세요."');
    const [freeFormatOutput, setFreeFormatOutput] = useState('AI가 작성할 요약 글의 형식을 지정해 주세요. 요약 길이 등의는 기본으로 제공됩니다.\n\nex. "고객 문의 요약 -> 상담사 응대 요약" 순서로 작성해 주세요.');
    // 테스트 상태
    const [sampleData, setSampleData] = useState('상담사: 안녕하세요, OO화재보험 상담사 김철수입니다. 무엇을 도와드릴까요?\n' +
        '고객: 네, 안녕하세요. 제가 가입한 자산보장 상품 갱신 관련해서 문의드립니다.\n' +
        '상담사: 네, 말씀해주세요. 고객님 성함과 가입하신 상품명 알려주시겠어요?\n' +
        '고객: 박지민이구요, 행복자산보장 플러스 상품입니다.\n' +
        '상담사: 네, 확인해보겠습니다. 잠시만 기다려주세요... 박지민 고객님 맞으시죠? 현재 행복자산보장 플러스 상품이 올해 11월에 갱신 예정이십니다.\n' +
        '고객: 네, 맞아요. 갱신되면 보험료가 얼마나 오르나요?\n' +
        '상담사: 현재 예상으로는 약 5% 정도 인상될 것으로 보입니다. 작년 대비 이자율 상승과 장해보험금 보장 범위가 확대되어 조정됩니다.\n' +
        '고객: 5%요? 작년에도 올랐는데 또 오르네요. 작년에는 3% 오른다고 하더니 실제로는 4%가 올라서 좀 당황했거든요.\n' +
        '상담사: 네, 말씀해주신 부분 이해합니다. 작년에는 예상치보다 물가상승률이 높아 요율이 변경되었습니다. 올해는 현재 시점 기준으로 5% 예상이지만, 최종 갱신 시점에 변동될 수 있습니다.\n' +
        '고객: 음... 그럼 매년 계속 오르는 거네요?\n' +
        '상담사: 기본적으로 보험 상품은 위험률, 이자율 등 여러 요인에 따라 갱신 시 보험료가 조정될 수 있습니다. 다만, 고객님의 계약은 3년마다 갱신되며, 최대 80세까지 보장받으실 수 있습니다.\n' +
        '고객: 알겠습니다. 다른 상품으로 바꾸는 건 어떨까요?\n' +
        '상담사: 다른 상품으로 전환도 가능합니다만, 현재 연령대로 새로 가입하시면 보험료가 더 높아질 수 있습니다. 현재 상품의 보장 내용과 보험료를 고려하면 유지하시는 것이 유리할 수 있습니다. 원하신다면 다른 상품과 비교 분석해드릴 수 있습니다.\n' +
        '고객: 아니요, 일단 알겠습니다. 갱신 전에 다시 연락주실 수 있나요?\n' +
        '상담사: 네, 갱신 한 달 전에 안내문자와 함께 상세 내용을 우편으로 발송해드립니다. 추가로 궁금하신 점 있으시면 언제든 연락주세요.\n' +
        '고객: 네, 감사합니다.');
    // 결과 출력 부분 (실제로는 API 호출 결과가 들어갈 부분)
    const testResult = '고객의 자산 보장 갱신 관련 문의에 대해 올해 5% 인상 예정임을 안내함. ' +
        '인상 이유는 이자율 상승, 장해보험금 증가 등이며, 고객은 전년도 요율 변경으로 인한 불만을 설명. ' +
        '상담사는 이에 대해 경청하며 기존 계약 조건을 재설명하고 고객에게 응대.';
    // 지시사항 추가 핸들러
    const handleAddInstruction = () => {
        if (newInstruction.trim() !== '') {
            setInstructions([...instructions, newInstruction]);
            setNewInstruction('');
        }
    };
    // 지시사항 삭제 핸들러
    const handleDeleteInstruction = (index) => {
        const updatedInstructions = [...instructions];
        updatedInstructions.splice(index, 1);
        setInstructions(updatedInstructions);
    };
    // 프롬프트 생성
    const generatePrompt = () => {
        if (format === 'fixed') {
            const warningsText = instructions.map(instr => `[⚠️${instr}]`).join('\n\n');
            return `# AI 상담 프롬프트

## Instructions

[기본]  Simple_variable의 고객과 상담사 전체 대화 내용을 분석하여 요약해 주세요.

${warningsText}

## Output Format
- 응답은 항상 [${summaryLength || '글자 수'}]자 이내로 작성합니다.
- 핵심 정보만 전달하되, 부정확한 내용은 제공하지 않습니다.
- 불확실한 정보는 제공하지 않습니다.`;
        }
        else {
            // 자유 형식일 때의 프롬프트
            return `# AI 상담 프롬프트

${freeFormatDescription}

## 지시사항

${freeFormatInstructions}

## 출력 형식

${freeFormatOutput}

- 응답은 항상 [${summaryLength || '글자 수'}]자 이내로 작성합니다.
- 핵심 정보만 전달하되, 부정확한 내용은 제공하지 않습니다.
- 불확실한 정보는 제공하지 않습니다.`;
        }
    };
    // 뒤로가기 핸들러
    const handleGoBack = () => {
        navigate('/prompt-management');
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx("button", { onClick: handleGoBack, className: "mr-4 text-gray-500 hover:text-gray-700", children: _jsx(FiArrowLeft, { size: 20 }) }), _jsxs("h1", { className: "text-2xl font-semibold", children: [promptName, " \uD504\uB86C\uD504\uD2B8 \uC124\uC815"] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [_jsx("div", { className: "bg-white rounded-lg border p-6", children: _jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "\uD504\uB86C\uD504\uD2B8 \uC124\uC815" }), _jsxs("div", { className: "mb-4 flex space-x-4", children: [_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "radio", value: "fixed", checked: format === 'fixed', onChange: () => setFormat('fixed'), className: "h-4 w-4 text-blue-600 focus:ring-blue-500" }), _jsx("span", { className: "ml-2 text-sm text-gray-700", children: "\uC9C0\uC815 \uD615\uC2DD" })] }), _jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "radio", value: "free", checked: format === 'free', onChange: () => setFormat('free'), className: "h-4 w-4 text-blue-600 focus:ring-blue-500" }), _jsx("span", { className: "ml-2 text-sm text-gray-700", children: "\uC790\uC720 \uD615\uC2DD" })] })] }), format === 'fixed' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uC601\uC5ED" }), _jsx("input", { type: "text", value: domain, onChange: (e) => setDomain(e.target.value), placeholder: "\uC608: \uBCF4\uD5D8, \uCEE4\uBA38\uC2A4, \uD1B5\uC2E0 \uBCA4\uB354", className: "p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" }), _jsx("p", { className: "mt-1 text-xs text-gray-500", children: "AI\uAC00 \uC0C1\uB2F4 \uB0B4\uC6A9\uC744 \uBD84\uC11D\uD558\uC5EC \uC694\uC57D\uD560 \uC0B0\uC5C5\uAD70\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uC694\uC57D \uAE00\uC790 \uC218" }), _jsx("input", { type: "number", value: summaryLength, onChange: (e) => setSummaryLength(e.target.value), placeholder: "\uC608: 50", className: "p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" }), _jsx("p", { className: "mt-1 text-xs text-gray-500", children: "AI\uAC00 \uC0C1\uB2F4\uC744 \uC694\uC57D\uD560 \uCD5C\uB300 \uAE00\uC790 \uC218\uB97C \uC124\uC815\uD574 \uC8FC\uC138\uC694. (\uB2E8, \uC124\uC815 \uAC12\uC5D0 \uC0C1\uAD00\uC5C6\uC774 AI\uAC00 \uBB38\uB9E5 \uD750\uB984\uC5D0 \uB9DE\uCDB0 \uC694\uC57D \uAE00\uC790 \uC218\uB97C \uC870\uC808\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.)" })] })] }), _jsxs("div", { className: "mt-6", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uC9C0\uC2DC \uC0AC\uD56D" }), _jsxs("div", { className: "flex mb-2", children: [_jsx("input", { type: "text", value: newInstruction, onChange: (e) => setNewInstruction(e.target.value), placeholder: "\uC608: \uC804\uD654\uBC88\uD638, \uC774\uBA54\uC77C, \uC8FC\uC18C, \uC8FC\uBBFC\uBC88\uD638, \uC1A1\uC7A5\uBC88\uD638 \uB4F1 \uAC1C\uC778\uC815\uBCF4\uAC00 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB3C4\uB85D \uC8FC\uC758\uD574\uC8FC\uC138\uC694.", className: "flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsxs("button", { onClick: handleAddInstruction, className: "bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 flex items-center", children: [_jsx(FiPlus, { className: "mr-1" }), " \uCD94\uAC00"] })] }), _jsx("div", { className: "space-y-2 mt-3", children: instructions.map((instruction, index) => (_jsx(InstructionItem, { instruction: instruction, onDelete: () => handleDeleteInstruction(index) }, index))) })] }), _jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "\uD504\uB86C\uD504\uD2B8 \uBBF8\uB9AC\uBCF4\uAE30" }), _jsx("div", { className: "bg-gray-50 border border-gray-200 p-4 rounded-md whitespace-pre-wrap text-sm font-mono", children: generatePrompt() })] })] })) : (_jsx(_Fragment, { children: _jsxs("div", { className: "space-y-6 mt-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uD398\uB974\uC18C\uB098" }), _jsx("textarea", { value: freeFormatDescription, onChange: (e) => setFreeFormatDescription(e.target.value), className: "w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uC9C0\uC2DC\uC0AC\uD56D" }), _jsx("textarea", { value: freeFormatInstructions, onChange: (e) => setFreeFormatInstructions(e.target.value), className: "w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "\uCD9C\uB825 \uD615\uC2DD" }), _jsx("textarea", { value: freeFormatOutput, onChange: (e) => setFreeFormatOutput(e.target.value), className: "w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" })] })] }) }))] }) }), _jsxs("div", { className: "bg-white rounded-lg border p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "\uD504\uB86C\uD504\uD2B8 \uD14C\uC2A4\uD2B8" }), _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-md font-medium mb-2", children: "\uC0D8\uD50C \uC0C1\uB2F4 \uB370\uC774\uD130" }), _jsx("div", { className: "flex items-center justify-between mb-1", children: _jsxs("div", { className: "mb-4 flex w-full relative", children: [_jsx("input", { type: "text", placeholder: "\uCE74\uCE74\uC624 \uC0C1\uB2F4 \uB300\uD654", className: "w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("button", { className: "absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] }) }), _jsx("textarea", { value: sampleData, onChange: (e) => setSampleData(e.target.value), className: "w-full h-36 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm", placeholder: "\uACE0\uAC1D: \"\uC790\uB3D9\uCC28 \uBCF4\uD5D8 \uAC31\uC2E0 \uC608\uC815\uC778\uB370, \uC791\uB144\uBCF4\uB2E4 \uB9CE\uC774 \uC62C\uB790\uB098\uC694?\"\n\uC0C1\uB2F4\uC0AC: \"\uC548\uB155\uD558\uC138\uC694, \uACE0\uAC1D\uB2D8. \uD655\uC778\uC744 \uC704\uD574 \uACC4\uC57D\uC790 \uC131\uD568\uACFC \uC0DD\uB144\uC6D4\uC77C \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4.\"\n\uACE0\uAC1D: \"\uD64D\uAE38\uB3D9, 1980\uB144 1\uC6D4 1\uC77C\uC785\uB2C8\uB2E4.\"\n\uC0C1\uB2F4\uC0AC: \"\uD604\uC7AC \uD655\uC778\uD588\uB2C8\uB2E4. \uACE0\uAC1D\uB2D8\uC758 \uC790\uB3D9\uCC28 \uBCF4\uD5D8\uC740 \uB2E4\uC74C \uB2EC 15\uC77C\uC5D0 \uAC31\uC2E0 \uC608\uC815\uC774\uBA70, \uD604\uC7AC \uC608\uC0C1 \uBCF4\uD5D8\uB8CC\uB294 \uC791\uB144 \uB300\uBE44 \uC57D 5% \uC778\uC0C1\uB41C \uAE08\uC561\uC785\uB2C8\uB2E4.\"\n\uACE0\uAC1D: \"\uC778\uC0C1 \uC774\uC720\uAC00 \uBB54\uAC00\uC694?\"\n\uC0C1\uB2F4\uC0AC: \"\uC790\uB3D9\uCC28\uC758 \uD3C9\uADE0 \uC2DC\uC2B9\uACFC \uBD80\uD488 \uAC00\uACA9 \uC778\uC0C1, \uADF8\uB9AC\uACE0 \uC804\uB144\uB3C4 \uAD50\uD1B5\uC0AC\uACE0 \uC99D\uAC00\uB85C \uC778\uD55C \uC0C1\uD669 \uC694\uC728 \uBCC0\uD654\uC774 \uC8FC\uB41C \uC694\uC778\uC785\uB2C8\uB2E4.\"\n\uACE0\uAC1D: \"\uC54C\uACA0\uC2B5\uB2C8\uB2E4. \uD639\uC2DC \uC804\uC5D0 \uB2E4\uC2DC \uC5F0\uB77D \uC8FC\uC2DC\uB098\uC694?\"\n\uC0C1\uB2F4\uC0AC: \"\uB124, \uD61C\uD0DD 7\uC77C \uC804\uC5D0 \uC548\uB0B4 \uBB38\uC790\uC640 \uC804\uD654\uB85C \uCD5C\uC885 \uC548\uB0B4\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.\"" })] }), _jsx("div", { className: "mb-4 flex justify-center", children: _jsx("button", { className: "w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center", children: "\uD14C\uC2A4\uD2B8 \uC2E4\uD589" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-md font-medium mb-2", children: "\uD14C\uC2A4\uD2B8 \uACB0\uACFC" }), _jsx("div", { className: "w-full min-h-32 p-4 bg-gray-100 border border-gray-300 rounded-md overflow-auto", children: _jsx("p", { className: "text-sm text-gray-700 whitespace-pre-wrap", children: "\uACE0\uAC1D\uC758 \uC790\uB3D9\uCC28 \uBCF4\uD5D8 \uAC31\uC2E0 \uAD00\uB828 \uBB38\uC758\uC5D0 \uB300\uD574 \uC57D 5% \uC778\uC0C1 \uC608\uC815\uC784\uC744 \uC548\uB0B4\uD568. \uC778\uC0C1 \uC774\uC720\uB294 \uD3C9\uADE0 \uC2DC\uC2B9, \uBD80\uD488 \uAC00\uACA9 \uC778\uC0C1, \uAD50\uD1B5\uC0AC\uACE0 \uC99D\uAC00\uB85C \uC778\uD55C \uC694\uC728 \uBCC0\uACBD\uC784\uC744 \uC124\uBA85. \uAC31\uC2E0 7\uC77C \uC804 \uC548\uB0B4 \uBB38\uC790\uC640 \uC804\uD654\uB85C \uCD5C\uC885 \uC548\uB0B4 \uC608\uC815\uC784\uC744 \uACE0\uAC1D\uC5D0\uAC8C \uC54C\uB9BC." }) }), _jsx("div", { className: "flex justify-end mt-2", children: _jsxs("button", { className: "text-gray-500 flex items-center text-sm", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" }) }), "\uBCF5\uC0AC"] }) })] })] })] })] })] }));
};
export default Prompts;
