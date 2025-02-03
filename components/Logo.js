export default function Logo({ className }) {
  // 计算圆边缘45度处的手柄起点：圆心(40,40) + 20 * (cos45, sin45) ≈ (54.1,54.1)
  return (
    <svg 
      className="w-64 h-64 mb-8" 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A0DAD" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
      </defs>
      
      {/* 绘制放大镜镜片 */}
      <circle 
        cx="40" 
        cy="40" 
        r="20" 
        fill="none" 
        stroke="url(#grad)" 
        strokeWidth="4" 
      />
      
      {/* 绘制放大镜的手柄，从镜片45°处开始 */}
      <line 
        x1="54.1" 
        y1="54.1" 
        x2="70" 
        y2="70" 
        stroke="url(#grad)" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />
      
      {/* 在镜片内部添加 AI 节点及其连线 */}
      <circle cx="32" cy="32" r="2" fill="url(#grad)" />
      <circle cx="48" cy="32" r="2" fill="url(#grad)" />
      <circle cx="40" cy="46" r="2" fill="url(#grad)" />
      <line x1="32" y1="32" x2="48" y2="32" stroke="url(#grad)" strokeWidth="1" />
      <line x1="32" y1="32" x2="40" y2="46" stroke="url(#grad)" strokeWidth="1" />
      <line x1="48" y1="32" x2="40" y2="46" stroke="url(#grad)" strokeWidth="1" />
    </svg>
  )
}
