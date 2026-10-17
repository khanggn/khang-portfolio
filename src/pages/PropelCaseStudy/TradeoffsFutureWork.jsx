import * as propelStyles from './styles';

export default function TradeoffsFutureWork() {
  return (
    <div>
      <h2 style={propelStyles.sectionHeading}>
        Tradeoffs & Future Work
      </h2>
      <div style={propelStyles.bodyText}>
        <p>
          Our biggest assumption going in was that EBT users needed a better interface for something they were already doing. What we found was that most of them weren't doing it at all, not because they lacked motivation, but because no tool had ever fit around the way they actually live. Ann cooks from the fridge. Lydia doesn't know what's covered. Jaden's card is in two cities at once. A rigid meal planner wouldn't have helped any of them.
        </p>
        <p>
          If we had more time, we'd test whether the "Have it?" pantry check-in is actually used in practice. Our instinct says yes, since it fits Ann's behavior, but we haven't validated it against the hi-fi prototype with a real user session. We'd also want to explore what happens when the estimated cost exceeds the remaining balance, and how to handle that gracefully without shaming the user.
        </p>
        <p>
          The tradeoff we're most uncertain about is the recipe cost estimates. We used rough approximations based on average grocery prices, but actual costs vary by store and region. Being slightly wrong could erode trust fast, especially for users who are already anxious about money. A future version would need a more robust pricing data source, or at minimum, clearer framing that these are estimates.
        </p>
      </div>
    </div>
  );
}
