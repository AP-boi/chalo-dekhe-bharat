import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchComponent = ({ value, onChange }: SearchComponentProps) => {
  return (
    <div className="relative flex items-center justify-center scale-110 sm:scale-125 my-8">
      <div id="poda" className="relative flex items-center justify-center group">
        {/* Layer 1: Saffron & Gold Conic Aura */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[70px] max-w-[324px] rounded-2xl blur-[4px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[60deg]
                        before:bg-[conic-gradient(#1B1410,#FF6A2B_8%,#1B1410_38%,#1B1410_50%,#FFB100_62%,#1B1410_87%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]">
        </div>

        {/* Layer 2: Ambient Gold Shimmer */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[66px] max-w-[320px] rounded-2xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(27,20,16,0),#FF6A2B,rgba(27,20,16,0)_12%,rgba(27,20,16,0)_50%,#FFB100,rgba(27,20,16,0)_62%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
        </div>

        {/* Main Liquid Glass Container */}
        <div id="main" className="relative group flex items-center">
          <div
            className="absolute inset-0 isolate -z-10 h-full w-full overflow-hidden rounded-2xl border border-[#FF6A2B]/40 transition-all group-focus-within:border-[#FFB100]"
            style={{ backdropFilter: 'url("#container-glass")' }}
          />

          <input 
            placeholder="Search monuments, eras..." 
            type="text" 
            name="text" 
            value={value}
            onChange={onChange}
            className="bg-transparent w-[320px] h-[58px] rounded-2xl text-[#FFF6E9] pl-[56px] pr-[56px] text-base focus:outline-none placeholder:text-[#FFF6E9]/50 transition-all font-body
                       shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(255,255,255,0.25),inset_-3px_-3px_0.5px_-3px_rgba(255,255,255,0.7),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.5)]" 
          />

          <div id="search-icon" className="absolute left-4 top-[17px] pointer-events-none z-10">
            <Search size={22} className="text-[#FF6A2B]" />
          </div>

          {/* Liquid Glass Filter Button on Right */}
          <div 
            id="filter-icon" 
            className="absolute top-2 right-2 flex items-center justify-center z-10 h-10 w-10 overflow-hidden rounded-xl border border-[#FF6A2B]/40 bg-transparent transition-all hover:scale-105 cursor-pointer
                       shadow-[0_0_6px_rgba(0,0,0,0.03),inset_2px_2px_0.5px_-2px_rgba(255,255,255,0.3),inset_-2px_-2px_0.5px_-2px_rgba(255,255,255,0.7)]"
            style={{ backdropFilter: 'url("#container-glass")' }}
          >
            <SlidersHorizontal size={18} className="text-[#FFB100]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;


