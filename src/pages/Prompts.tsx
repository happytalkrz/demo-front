import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiCopy, FiEdit, FiSave, FiArrowLeft } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const InstructionItem = ({ 
  instruction, 
  onDelete 
}: { 
  instruction: string; 
  onDelete: () => void;
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-2">
      <p className="text-sm text-gray-700">{instruction}</p>
      <button 
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  );
};

const Prompts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const promptName = location.state?.promptName || '프롬프트 설정';
  
  // 프롬프트 설정 상태
  const [format, setFormat] = useState<'fixed' | 'free'>('fixed');
  const [domain, setDomain] = useState('');
  const [summaryLength, setSummaryLength] = useState('');
  const [instructions, setInstructions] = useState<string[]>([
    '전화번호, 이메일, 주소, 주민번호, 송장번호 등 개인정보가 포함되지 않도록 주의해주세요.'
  ]);
  const [newInstruction, setNewInstruction] = useState('');
  
  // 자유 형식 관련 상태
  const [freeFormatDescription, setFreeFormatDescription] = useState('이 프롬프트를 사용하는 AI의 역할을 설명해주세요.\n\nex. "당신은 고객 상담 내용을 요약하는 전문 AI 어시스턴트입니다."');
  const [freeFormatInstructions, setFreeFormatInstructions] = useState('AI가 상담 내용을 어떻게 요약해야 하는지 구체적으로 작성해주세요.\n하나의 문장에는 하나의 지시사항만 입력해주세요. 여러 지시사항을 한 문장에 작으면 AI가 정확하게 인식하지 못할 수 있습니다.\n\nex1) "고객 요청 -> 상담사 응대 -> 처리 결과 순으로 요약해주세요."\nex2) "개인정보(전화번호, 주소 등)는 제거하고, 간결하게 작성해주세요."');
  const [freeFormatOutput, setFreeFormatOutput] = useState('AI가 작성할 요약 글의 형식을 지정해 주세요. 요약 길이 등의는 기본으로 제공됩니다.\n\nex. "고객 문의 요약 -> 상담사 응대 요약" 순서로 작성해 주세요.');
  
  // 테스트 상태
  const [sampleData, setSampleData] = useState(
    '상담사: 안녕하세요, OO화재보험 상담사 김철수입니다. 무엇을 도와드릴까요?\n' +
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
    '고객: 네, 감사합니다.'
  );
  
  // 결과 출력 부분 (실제로는 API 호출 결과가 들어갈 부분)
  const testResult = 
    '고객의 자산 보장 갱신 관련 문의에 대해 올해 5% 인상 예정임을 안내함. ' +
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
  const handleDeleteInstruction = (index: number) => {
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
    } else {
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleGoBack}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold">{promptName} 프롬프트 설정</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* 프롬프트 설정 영역 */}
        <div className="bg-white rounded-lg border p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">프롬프트 설정</h2>
            
            {/* 형식 선택 */}
            <div className="mb-4 flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="fixed"
                  checked={format === 'fixed'}
                  onChange={() => setFormat('fixed')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">지정 형식</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="free"
                  checked={format === 'free'}
                  onChange={() => setFormat('free')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">자유 형식</span>
              </label>
            </div>
            
            {format === 'fixed' ? (
              <>
                <div className="grid grid-cols-2 gap-6">
                  {/* 영역 입력 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      영역
                    </label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="예: 보험, 커머스, 통신 벤더"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      AI가 상담 내용을 분석하여 요약할 산업군을 입력해 주세요.
                    </p>
                  </div>
                  
                  {/* 요약 글자 수 입력 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      요약 글자 수
                    </label>
                    <input
                      type="number"
                      value={summaryLength}
                      onChange={(e) => setSummaryLength(e.target.value)}
                      placeholder="예: 50"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      AI가 상담을 요약할 최대 글자 수를 설정해 주세요. (단, 설정 값에 상관없이 AI가 문맥 흐름에 맞춰 요약 글자 수를 조절할 수 있습니다.)
                    </p>
                  </div>
                </div>
                
                {/* 지시 사항 입력 */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    지시 사항
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      placeholder="예: 전화번호, 이메일, 주소, 주민번호, 송장번호 등 개인정보가 포함되지 않도록 주의해주세요."
                      className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddInstruction}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 flex items-center"
                    >
                      <FiPlus className="mr-1" /> 추가
                    </button>
                  </div>
                  <div className="space-y-2 mt-3">
                    {instructions.map((instruction, index) => (
                      <InstructionItem
                        key={index}
                        instruction={instruction}
                        onDelete={() => handleDeleteInstruction(index)}
                      />
                    ))}
                  </div>
                </div>
                {/* 프롬프트 미리보기 영역 */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">프롬프트 미리보기</h2>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-md whitespace-pre-wrap text-sm font-mono">
                    {generatePrompt()}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 자유 형식일 때 표시되는 UI */}
                <div className="space-y-6 mt-4">
                  {/* 역할 설명 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      페르소나
                    </label>
                    <textarea
                      value={freeFormatDescription}
                      onChange={(e) => setFreeFormatDescription(e.target.value)}
                      className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  
                  {/* 지시사항 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      지시사항
                    </label>
                    <textarea
                      value={freeFormatInstructions}
                      onChange={(e) => setFreeFormatInstructions(e.target.value)}
                      className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  
                  {/* 출력 형식 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      출력 형식
                    </label>
                    <textarea
                      value={freeFormatOutput}
                      onChange={(e) => setFreeFormatOutput(e.target.value)}
                      className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          
          
        </div>
        
        {/* 프롬프트 테스트 영역 */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">프롬프트 테스트</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* 샘플 상담 데이터 입력 */}
            <div>
              <h3 className="text-md font-medium mb-2">샘플 상담 데이터</h3>
              <div className="flex items-center justify-between mb-1">
                <div className="mb-4 flex w-full relative">
                  <input
                    type="text"
                    placeholder="카카오 상담 대화"
                    className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <textarea
                value={sampleData}
                onChange={(e) => setSampleData(e.target.value)}
                className="w-full h-36 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="고객: &quot;자동차 보험 갱신 예정인데, 작년보다 많이 올랐나요?&quot;&#10;상담사: &quot;안녕하세요, 고객님. 확인을 위해 계약자 성함과 생년월일 부탁드립니다.&quot;&#10;고객: &quot;홍길동, 1980년 1월 1일입니다.&quot;&#10;상담사: &quot;현재 확인했니다. 고객님의 자동차 보험은 다음 달 15일에 갱신 예정이며, 현재 예상 보험료는 작년 대비 약 5% 인상된 금액입니다.&quot;&#10;고객: &quot;인상 이유가 뭔가요?&quot;&#10;상담사: &quot;자동차의 평균 시승과 부품 가격 인상, 그리고 전년도 교통사고 증가로 인한 상황 요율 변화이 주된 요인입니다.&quot;&#10;고객: &quot;알겠습니다. 혹시 전에 다시 연락 주시나요?&quot;&#10;상담사: &quot;네, 혜택 7일 전에 안내 문자와 전화로 최종 안내드리겠습니다.&quot;"
              />
            </div>
            
            <div className="mb-4 flex justify-center">
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              >
                테스트 실행
              </button>
            </div>
            {/* 테스트 결과 출력 영역 */}
            <div>
              <h3 className="text-md font-medium mb-2">테스트 결과</h3>
              <div className="w-full min-h-32 p-4 bg-gray-100 border border-gray-300 rounded-md overflow-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">고객의 자동차 보험 갱신 관련 문의에 대해 약 5% 인상 예정임을 안내함.
인상 이유는 평균 시승, 부품 가격 인상, 교통사고 증가로 인한 요율 변경임을 설명.
갱신 7일 전 안내 문자와 전화로 최종 안내 예정임을 고객에게 알림.</p>
              </div>
              <div className="flex justify-end mt-2">
                <button className="text-gray-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  복사
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts; 