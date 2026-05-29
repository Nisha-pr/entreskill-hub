import React, { useState, useEffect } from 'react'
import { getResourcesAPI } from '../../services/api'

const typeConfig = {
  video: { icon: '🎥', color: 'bg-red-100 text-red-600', label: 'Video' },
  article: { icon: '📄', color: 'bg-blue-100 text-blue-600', label: 'Article' },
  checklist: { icon: '✅', color: 'bg-green-100 text-green-600', label: 'Checklist' },
}

const levelConfig = {
  beginner: { color: 'bg-green-100 text-green-700', label: 'Beginner' },
  intermediate: { color: 'bg-yellow-100 text-yellow-700', label: 'Intermediate' },
  advanced: { color: 'bg-red-100 text-red-700', label: 'Advanced' },
}

const articleContent = {
  'Food Business Registration in India — Step by Step': `
## Food Business Registration in India

Starting a food business requires proper licensing. Here is what you need:

### 1. FSSAI Registration
- Basic registration for turnover below ₹12 lakhs/year
- Apply at fssai.gov.in
- Cost: ₹100/year
- Documents: Aadhaar, address proof, business details

### 2. GST Registration
- Required if turnover exceeds ₹20 lakhs/year
- Apply at gst.gov.in
- Free registration
- Documents: PAN, Aadhaar, bank account details

### 3. Local Municipal License
- Required for physical food establishments
- Apply at local municipal office
- Cost varies by city

### 4. Trade License
- Required for commercial food operations
- Contact local municipal corporation
- Renewal required annually

### Tips
- Start with basic FSSAI registration
- Maintain hygiene records
- Get food handler certificates for staff
  `,
  'How to Price Your Handmade Products': `
## How to Price Your Handmade Products

Pricing handmade products correctly is crucial for profitability.

### The Pricing Formula
**Price = Material Cost + Labor Cost + Overhead + Profit Margin**

### Step 1: Calculate Material Cost
- List every material used
- Include packaging costs
- Add 10% buffer for waste

### Step 2: Calculate Labor Cost
- Decide your hourly rate (minimum ₹100/hour)
- Track time for each product
- Example: 2 hours × ₹150 = ₹300

### Step 3: Add Overhead
- Internet, electricity, tools
- Divide monthly overhead by products made
- Usually 10-20% of material + labor

### Step 4: Add Profit Margin
- Minimum 30% profit margin
- For premium products: 50-100%

### Example Calculation
- Materials: ₹200
- Labor: ₹300
- Overhead: ₹50
- Subtotal: ₹550
- Profit (40%): ₹220
- **Final Price: ₹770**

### Where to Sell
- Instagram/Facebook shop
- Meesho (zero commission)
- Etsy (international customers)
- Local exhibitions
  `,
  'How to Sell on Meesho — Beginner Guide': `
## How to Sell on Meesho

Meesho is India's largest reselling platform with 10 crore+ customers.

### Getting Started
1. Download Meesho Supplier app
2. Register with GST number (or PAN for small sellers)
3. Add bank account for payments
4. List your products

### Listing Your Products
- Take clear photos on white background
- Write detailed descriptions
- Set competitive prices
- Add multiple product variants

### Pricing Strategy
- Check competitor prices
- Keep margin of 20-30%
- Meesho charges 0% commission
- Shipping is handled by Meesho

### Getting Your First Order
- List minimum 10 products
- Use trending keywords in titles
- Offer competitive prices initially
- Respond to customer queries quickly

### Tips for Success
- Maintain 4+ star rating
- Ship within 24 hours
- Use quality packaging
- Offer returns gracefully
  `
}

const categories = ['All', 'Tailoring', 'Food Business', 'Digital Marketing', 'Handicrafts', 'Photography', 'Legal', 'E-Commerce', 'General']

const Resources = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('all')
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      try {
        const params = {}
        if (activeType !== 'all') params.type = activeType
        if (activeCategory !== 'All') params.category = activeCategory
        const { data } = await getResourcesAPI(params)
        setResources(data)
      } catch (error) {
        console.error('Failed to fetch resources:', error)
      }
      setLoading(false)
    }
    fetchResources()
  }, [activeType, activeCategory])

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase()) ||
    r.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const renderMarkdown = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-gray-800 mt-6 mb-3">{line.replace('## ', '')}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-gray-700 mt-4 mb-2">{line.replace('### ', '')}</h3>
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-gray-800 my-2">{line.replace(/\*\*/g, '')}</p>
      if (line.startsWith('- ')) return <li key={i} className="text-gray-600 ml-4 my-1 list-disc">{line.replace('- ', '')}</li>
      if (line.trim() === '') return <br key={i} />
      return <p key={i} className="text-gray-600 my-1">{line}</p>
    })
  }

  if (selectedArticle) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => setSelectedArticle(null)}
          className="text-indigo-600 hover:underline mb-6 block font-medium"
        >
          ← Back to Resources
        </button>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-600">
              📄 Article
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
              {selectedArticle.level}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedArticle.title}</h1>
          <p className="text-gray-400 text-sm mb-6">⏱ {selectedArticle.duration} • 📂 {selectedArticle.category}</p>
          <div className="border-t border-gray-100 pt-6">
            {articleContent[selectedArticle.title]
              ? renderMarkdown(articleContent[selectedArticle.title])
              : <p className="text-gray-600">{selectedArticle.description}</p>
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Resources</h1>
        <p className="text-gray-500">Videos, articles, and checklists to help you launch your business</p>
      </div>

      <input
        type="text"
        placeholder="Search resources by title, topic, or tag..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="flex gap-3 mb-6 flex-wrap">
        {['all', 'video', 'article', 'checklist'].map(type => (
          <button key={type} onClick={() => setActiveType(type)}
            className={'px-5 py-2 rounded-xl text-sm font-medium transition-all capitalize ' + (activeType === type ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-300 hover:border-indigo-400')}>
            {type === 'all' ? '📚 All' : typeConfig[type].icon + ' ' + typeConfig[type].label + 's'}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={'px-4 py-1.5 rounded-full text-xs font-medium transition-all ' + (activeCategory === cat ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-400' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600')}>
            {cat}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 mb-6">Showing {filtered.length} resources</p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg">No resources found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(resource => (
            <div key={resource._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group">
              <div className={'h-1.5 ' + (resource.type === 'video' ? 'bg-red-400' : resource.type === 'article' ? 'bg-blue-400' : 'bg-green-400')} />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={'text-xs font-semibold px-2.5 py-1 rounded-full ' + typeConfig[resource.type].color}>
                    {typeConfig[resource.type].icon} {typeConfig[resource.type].label}
                  </span>
                  <span className={'text-xs font-semibold px-2.5 py-1 rounded-full ' + levelConfig[resource.level].color}>
                    {levelConfig[resource.level].label}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                  {resource.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">{resource.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags && resource.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>{resource.duration}</span>
                  <span>{resource.category}</span>
                </div>

                {resource.type === 'checklist' && (
                  <button onClick={() => setExpanded(expanded === resource._id ? null : resource._id)}
                    className="w-full text-left text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-3">
                    {expanded === resource._id ? '▲ Hide Checklist' : '▼ View Checklist'}
                  </button>
                )}
                {expanded === resource._id && (
                  <ul className="space-y-2 mt-2 mb-3">
                    {resource.description.split(',').map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                )}

                {resource.type === 'video' && resource.url ? (
                  <a href={resource.url} target="_blank" rel="noreferrer"
                    className="block w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                    Watch Video
                  </a>
                ) : resource.type === 'article' ? (
                  <button
                    onClick={() => setSelectedArticle(resource)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                    Read Article
                  </button>
                ) : (
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-sm font-medium transition-colors">
                    Use Checklist
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Resources
