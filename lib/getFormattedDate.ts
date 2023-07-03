export default function getFormattedDate(dateString:string) : string {

  // zh-CN
  return new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(new Date(dateString))
} 