// node scripts/seed.js 로 실행 (Strapi 서버 기동 후)
const axios = require('axios')

const BASE = 'http://localhost:1337/api'

// 1. Strapi 어드민 JWT 토큰 취득 (최초 1회 로그인)
async function getToken() {
  const { data } = await axios.post(`${BASE}/auth/local`, {
    identifier: process.env.STRAPI_ADMIN_EMAIL,
    password: process.env.STRAPI_ADMIN_PASSWORD,
  })
  return data.jwt
}

// 2. 공지사항 시드
// body: Long text (HTML 문자열). views는 Strapi Default:0 적용되므로 생략.
// attachments(미디어)는 REST로 시드 불가 → 어드민에서 수동 업로드.
const notices = [
  {
    title: '[안내] 2024년 결산 공고 및 지정기부금 단체 실적 공시',
    isPinned: true,
    date: '2024-03-15',
    body: `<p>안녕하세요, 사단법인 꽃재(Blooming Hill)입니다.</p>
<p>항상 꽃재 재단과 함께해주시는 후원자 여러분과 지역사회 구성원분들께 깊은 감사의 인사를 드립니다. 저희 재단은 정직하고 투명한 운영을 최우선 가치로 삼고 있으며, 관련 법령에 의거하여 2024년도 재무 결산 내역 및 지정기부금 활용 실적을 다음과 같이 공시합니다.</p>
<p><strong>공시 개요</strong></p>
<ul>
  <li><strong>공시항목:</strong> 2024년도 재무제표 및 지정기부금 수입/지출 내역</li>
  <li><strong>관련근거:</strong> 상속세 및 증여세법 제50조의3, 소득세법 제34조</li>
  <li><strong>공고장소:</strong> 사단법인 꽃재 홈페이지 및 국세청 홈택스</li>
</ul>
<p>꽃재는 후원자님의 소중한 기부금이 소외된 이웃의 자립과 성장을 위해 가장 효율적으로 사용될 수 있도록 최선을 다하고 있습니다. 감사합니다.</p>`,
  },
  {
    title: '[공지] 제5회 정기연주회 관람 신청 안내 (무료 공연)',
    isPinned: true,
    date: '2024-03-02',
    body: '<p>꽃재 다문화오케스트라의 제5회 정기연주회에 여러분을 초대합니다. 자세한 내용은 추후 공지 예정입니다.</p>',
  },
  { title: '꽃재 나눔 릴레이 캠페인 참여 안내', isPinned: false, date: '2024-02-28', body: '' },
  { title: '2024년 상반기 장학생 선발 안내', isPinned: false, date: '2024-02-15', body: '' },
  { title: '자원봉사자 모집: 지역아동센터 음악 교육 지원', isPinned: false, date: '2024-02-10', body: '' },
  { title: '설 연휴 사무국 휴무 및 운영 안내', isPinned: false, date: '2024-02-05', body: '' },
  { title: '2023년 하반기 사업보고서 공시 안내', isPinned: false, date: '2023-12-20', body: '' },
  { title: '꽃재 바자회 수익금 전달식 개최 안내', isPinned: false, date: '2023-11-15', body: '' },
  { title: '2023년 정기총회 개최 공고', isPinned: false, date: '2023-10-30', body: '' },
  { title: '사단법인 꽃재 홈페이지 개편 안내', isPinned: false, date: '2023-09-01', body: '' },
]

// 3. 언론 보도자료 시드
// body: Long text (HTML). featuredImage/attachments는 어드민에서 수동 업로드.
const pressArticles = [
  {
    title: "꽃재, 취약계층 겨울나기 '따뜻한 방학' 지원 성료",
    type: '보도',
    date: '2024-11-20',
    body: `<p>사단법인 꽃재는 지난 15일, 다가오는 동절기를 맞아 지역 사회 내 에너지 취약계층 200가구를 대상으로 진행한 '따뜻한 방학' 겨울나기 지원 사업을 성공적으로 마무리했다고 밝혔습니다.</p>
<p>이번 지원 사업은 경제적 어려움으로 인해 난방비 부담이 큰 홀몸 어르신과 조손 가정을 중점적으로 지원하기 위해 기획되었습니다.</p>
<p>사단법인 꽃재는 지속 가능한 복지 생태계 구축을 목표로 교육 지원, 의료 지원, 주거 환경 개선 등 다양한 사회공헌 사업을 전개하고 있습니다.</p>`,
  },
  { title: '사단법인 꽃재, 제15회 정기연주회 성황리 개최', type: '뉴스', date: '2024-11-05', body: '' },
  { title: '꽃재 장학금 전달식, 지역 인재 육성에 앞장', type: '언론', date: '2024-10-25', body: '' },
  { title: "Blooming Hill, '함께하는 나눔' 바자회 수익금 전액 기부", type: '보도', date: '2024-10-10', body: '' },
  { title: '꽃재-성동구청, 지역사회 복지 증진을 위한 MOU 체결', type: '뉴스', date: '2024-09-28', body: '' },
  { title: "'꿈꾸는 숲' 1기 수료식 진행... 아동 정서 지원 강화", type: '보도', date: '2024-09-15', body: '' },
  { title: '꽃재 다문화오케스트라, 어르신 위문 공연 호평', type: '언론', date: '2024-08-30', body: '' },
  { title: '여름방학 청소년 봉사 캠프 성황... 200명 참여', type: '뉴스', date: '2024-08-12', body: '' },
  { title: '꽃재, 취약계층 여름방학 급식 지원 사업 실시', type: '보도', date: '2024-07-25', body: '' },
  { title: '사단법인 꽃재, 창립 10주년 기념 행사 개최', type: '언론', date: '2024-07-10', body: '' },
]


// 4. FAQ 시드
const faqs = [
  {
    order: 1,
    question: '후원금은 투명하게 쓰이나요?',
    answer: `사단법인 꽃재의 재무운영은 4단계의 감사시스템을 거칩니다.<br><br>
1. 법인이사회 감사<br>
2. 외부추천감사의 내부감사<br>
3. 외부회계법인의 감사<br>
4. 정부 감사(보건복지부, 국세청, 관할지자체 등)<br><br>
또한 연 1회 연간보고서를 발간해 진행된 사업결과를 보고합니다.`,
  },
  {
    order: 2,
    question: '기부금은 세액공제 받을 수 있나요?',
    answer: `꽃재는 법인세법 시행령 제 36조에 근거한 사회복지법인으로 지정기부금단체이며, 다음과 같이 세액공제 혜택을 받으실 수 있습니다.<br><br>
- 본인 근로소득 금액의 30% 한도 내에서 기부금의 15% 세액공제 (1,000만원 초과분은 30%)<br>
- 법인의 경우 기부금의 10% 세액공제`,
  },
  {
    order: 3,
    question: '기부금영수증은 어떻게 받을 수 있나요?',
    answer: `<p class="font-bold text-on-surface mb-2">1. 국세청 홈텍스 홈페이지에서 확인</p>
<p class="mb-4">- 주민번호가 등록되어있는 개인후원자의 기부내역을 국세청으로 신고해드립니다. 연초 연말정산 간소화 서비스를 통해 확인 가능합니다.</p>
<p class="font-bold text-on-surface mb-2">2. 꽃재 홈페이지에서 발급</p>
<p class="mb-4">- [마이페이지] &gt; [나의후원] &gt; [기부금영수증출력] 메뉴에서 1월 10일부터 5월 31일 사이 출력이 가능합니다.</p>
<p class="font-bold text-on-surface mb-2">3. 전화신청</p>
<p>- 기업 및 법인 후원자의 경우 종합소득세 신고 기간에 직접 연락주시면 발급해드립니다.</p>`,
  },
  {
    order: 4,
    question: '후원자 명의를 변경하여 기부금영수증을 발급받을 수 있나요?',
    answer: `아니요. 기부금영수증은 등록된 후원자님의 명의로만 발급됩니다. 허위 발급 시 소득세법 81조에 근거하여 법적처벌을 받게 되며, 타인명의 변경은 불가능합니다.<br><br>
단, 기본공제대상자(직계존속, 형제자매 포함)의 경우 명의변경 없이도 세액공제를 받을 수 있으며, 자녀 이름으로 후원한 경우 자녀 명의로 발급된 영수증을 부모님이 공제 받을 수 있습니다.`,
  },
  {
    order: 5,
    question: '현물후원이 가능한가요?',
    answer: `네, 가능합니다. 쌀, 생필품 등 후원해주신 물품은 어려운 이웃들에게 소중히 전달됩니다. 현물후원 신청 및 상세 안내는 대표번호 1577-9044로 문의 주시기 바랍니다.`,
  }
]

async function seed() {
  const token = await getToken()
  const headers = { Authorization: `Bearer ${token}` }

  for (const item of notices) {
    await axios.post(`${BASE}/notices`, { data: item }, { headers })
    console.log(`✓ Notice: ${item.title.slice(0, 30)}...`)
  }

  for (const item of pressArticles) {
    await axios.post(`${BASE}/press-articles`, { data: item }, { headers })
    console.log(`✓ Press: ${item.title.slice(0, 30)}...`)
  }

  for (const item of faqs) {
    await axios.post(`${BASE}/faqs`, { data: item }, { headers })
    console.log(`✓ FAQ: ${item.question}`)
  }

  console.log('시드 완료!')
}

seed().catch(console.error)