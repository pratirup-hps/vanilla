<?php
/**
 * @author Adam Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2021 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

namespace Vanilla\Scheduler;

/**
 * Class used to wrap the arguments for the next run in a long runner.
 */
final class LongRunnerNextArgs
{
    /** @var array */
    private $nextArgs;

    /**
     * Constructor.
     *
     * @param array $nextArgs The arguments to pass for the next invocation of the method.
     */
    public function __construct(array $nextArgs)
    {
        $this->nextArgs = $nextArgs;
    }

    /**
     * @return array
     */
    public function getNextArgs(): array
    {
        return $this->nextArgs;
    }
}
