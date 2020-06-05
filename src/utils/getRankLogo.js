import iron from '../assets/Rank/Logo/iron_rank.png';
import bronze from '../assets/Rank/Logo/bronze_rank.png';
import silver from '../assets/Rank/Logo/silver_rank.png';
import gold from '../assets/Rank/Logo/gold_rank.png';
import platinum from '../assets/Rank/Logo/platinum_rank.png';
import diamond from '../assets/Rank/Logo/iron_rank.png';
import master from '../assets/Rank/Logo/master_rank.png';
import grandmaster from '../assets/Rank/Logo/grandmaster_rank.png';
import challenger from '../assets/Rank/Logo/challenger_rank.png';
import unranked from '../assets/Rank/Logo/unranked-emblem.png';

export const getRankLogo = (rank) => {
  switch (rank) {
    case 'IRON':
      return iron;
    case 'BRONZE':
      return bronze;
    case 'SILVER':
      return silver;
    case 'GOLD':
      return gold;
    case 'PLATINUM':
      return platinum;
    case 'DIAMOND':
      return diamond;
    case 'MASTER':
      return master;
    case 'GRANDMASTER':
      return grandmaster;
    case 'CHALLENGER':
      return challenger;
    default:
      return unranked;
  }
};
