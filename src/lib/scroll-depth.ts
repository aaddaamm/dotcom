const MILESTONES = [25, 50, 75, 100] as const;

export function getReachedMilestones(pct: number, fired: Set<number>) {
	return MILESTONES.filter((milestone) => pct >= milestone && !fired.has(milestone));
}
