const SUPABASE_URL = 'https://xruppmvsysmmsubjxglo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_FNs-M-zGmLr_jGo-3jgrqg_voD5Sttm';

const db = {
  async query(table, options = {}) {
    let url = `${SUPABASE_URL}/rest/v1/${table}`;
    const params = [];
    if (options.select) params.push(`select=${options.select}`);
    if (options.filter) params.push(options.filter);
    if (options.order) params.push(`order=${options.order}`);
    if (options.limit) params.push(`limit=${options.limit}`);
    if (params.length) url += '?' + params.join('&');

    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return res.json();
  },

  async insert(table, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async update(table, id, data) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async delete(table, id) {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
  }
};

// Auth
const auth = {
  login(officer) { localStorage.setItem('krovos_user', JSON.stringify(officer)); },
  logout() { localStorage.removeItem('krovos_user'); window.location.href = 'index.html'; },
  current() { return JSON.parse(localStorage.getItem('krovos_user') || 'null'); },
  require() {
    const u = this.current();
    if (!u) window.location.href = 'index.html';
    return u;
  }
};

// Role colors
const ROLE_COLORS = {
  CEO: '#f59e0b', COO: '#3b82f6', CTO: '#8b5cf6',
  CFO: '#10b981', CMO: '#ec4899', BOARD: '#ff6b6b'
};

const ROLE_RESPONSIBILITIES = {
  CEO: ['Vision ও Strategy নির্ধারণ', 'Executive Leadership', 'Business Development', 'Major সিদ্ধান্ত গ্রহণ', 'আন্তর্জাতিক প্রতিনিধিত্ব', 'Board রিপোর্টিং'],
  COO: ['Operations পরিচালনা', 'Operational Execution', 'Business Processes', 'HR/People Operations', 'Team Performance Management', 'Strategy বাস্তবায়ন'],
  CTO: ['Technology Strategy', 'Software Architecture', 'Engineering Standards', 'Cybersecurity', 'R&D পরিচালনা', 'Technical Team Leadership'],
  CFO: ['আর্থিক পরিকল্পনা', 'Financial Reporting', 'Fundraising', 'আর্থিক ঝুঁকি নিয়ন্ত্রণ', 'Compliance', 'Budget নিয়ন্ত্রণ'],
  CMO: ['Brand Strategy', 'Marketing Campaigns', 'Digital Marketing', 'Market Research', 'Customer Acquisition', 'Public Relations'],
  BOARD: ['সব officer দেখা', 'সব client দেখা', 'Full overview', 'Constitution manage']
};
