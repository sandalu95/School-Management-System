export class Competition {
  constructor(
    type?: string,
    competition?: string,
    event?: string,
    place?: string,
    year?: string,
    description?: string
  ) {
    this.type = type;
    this.competition = competition;
    this.event = event;
    this.place = place;
    this.year = year;
    this.description = description;
  }

  type: string;
  competition: string;
  event: string;
  place: string;
  year: string;
  description: string;
}
