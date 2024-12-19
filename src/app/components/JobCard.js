import Link from "next/link";
import Logo from "./Logo";
import { useFavorites } from "../context/FavouritesContext"; 
import Tooltip from '@mui/material/Tooltip';
import { Star, MapPin, Clock, Briefcase } from 'lucide-react';

export default function JobCard({ job }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    isFavorite(job.id) ? removeFavorite(job.id) : addFavorite(job);
  };
  
  return (
    <li className="mb-4 sm:mb-8 p-4 sm:py-2 hover:bg-gray-50 border rounded-lg sm:rounded-none sm:border-none">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex items-start sm:items-center mb-3 sm:mb-0">
          <div className="hidden sm:block">
            <Logo companyName={job.company} />
          </div>
          
          <Link href={`/job/${job.id}`} className="flex-grow">
            <div className="sm:w-64 ml-0 sm:ml-2">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-500">{job.company}</p>
            </div>
          </Link>
        </div>

        {/* Mobile View Tags */}
        <div className="flex flex-wrap gap-2 mb-3 sm:hidden">
          <span className="bg-gray-200 px-2 py-1 rounded-lg text-sm flex items-center">
            {job.level}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded-lg text-sm flex items-center">
            {job.time}
          </span>
          <span className="font-semibold">
            {job.location}
          </span>
        </div>

        {/* Desktop View Info */}
        <div className="hidden sm:flex items-center flex-grow">
          <p className="w-28">
            <span className="bg-gray-200 px-2 py-1 rounded-lg inline-block">
              {job.level}
            </span>
          </p>
          <p className="w-28">
            <span className="bg-gray-200 px-2 py-1 rounded-lg inline-block">{job.time}</span>
          </p>
          <p className="font-semibold w-48">{job.salaryRange}</p>
          <p className="font-semibold w-32">{job.location}</p>
        </div>

        <p className="text-gray-700 mb-3 sm:hidden font-semibold">
          {job.salaryRange}
        </p>

        <button
          onClick={handleFavoriteClick}
          className="sm:ml-4 self-end sm:self-auto"
        >
          <Tooltip 
            title={isFavorite(job.id) ? "Remove from Favourites" : "Add to Favourites"} 
            placement="right"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -8],
                    },
                  },
                ],
              },
            }}
          >
            <Star
              color="#efbf04"
              strokeWidth={1.75}
              fill={isFavorite(job.id) ? "#efbf04" : "none"}
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
          </Tooltip>
        </button>
      </div>
    </li>
  );
}