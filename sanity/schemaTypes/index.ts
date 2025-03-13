import blockContent from './objects/blockContent'
import code from './objects/code'
import badge from './objects/badge'
import socialLinks from './objects/socialLinks'
import resourceCategory from './objects/resourceCategory'
import location from './objects/location'
import contactInfo from './objects/contactInfo'

import activity from './documents/activity'
import achievement from './documents/achievement'
import member from './documents/member'
import opportunity from './documents/opportunity'
import partnership from './documents/partnership'
import project from './documents/project'
import resource from './documents/resource'
import tool from './documents/tool'
import event from './documents/event'
import generalInfo from './documents/generalInfo'
import post from './documents/post'
import team from './documents/team'
import eventDetails from './objects/eventDetails'

export const schemaTypes = [
  // Document types
  achievement,
  activity,
  event,
  generalInfo,
  member,
  opportunity,
  partnership,
  post,
  project,
  resource,
  team,
  tool,

  
  // Object types
  badge, 
  blockContent,
  code,
  contactInfo,
  eventDetails,
  location, 
  resourceCategory,
  socialLinks,
] 