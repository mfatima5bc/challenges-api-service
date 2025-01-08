import { Challenge } from "@/domain/entities/challenge";

export class ChallengeViewModel {
  static toGraphQl(challenge: Challenge) {
    return {
      id: challenge.id.toString(),
      title: challenge.title,
      description: challenge.description,
      createdAt: challenge.createdAt,
      updatedAt: challenge.updatedAt
    }
  }
}
