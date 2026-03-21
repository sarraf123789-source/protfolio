import { supabase } from './supabase'
import content from './data.json'

export async function migrateToSupabase() {
  console.log('Starting migration...')
  
  const sections = ['hero', 'about', 'technicalSkills', 'softSkills', 'experience', 'projects', 'education', 'certificates', 'contact', 'footer']
  
  for (const section of sections) {
    const sectionData = (content as any)[section]
    
    if (sectionData) {
      console.log(`Migrating section: ${section}`)
      const { error } = await supabase
        .from('portfolio_content')
        .upsert({ key: section, data: sectionData }, { onConflict: 'key' })
      
      if (error) {
        console.error(`Error migrating ${section}:`, error.message)
      } else {
        console.log(`Successfully migrated ${section}`)
      }
    }
  }
  
  console.log('Migration complete!')
}
