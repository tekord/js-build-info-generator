import {execSync} from 'node:child_process';

/**
 * @param {string} mode
 * @param {string} template
 */
export function generateBuildInfoString(
  mode,
  template = '{now}.{mode} [{gitBranchName}:{gitCommitShortHash}]'
) {
  let buildInfo = {
    mode: mode,
    ...gatherBuildInfo()
  };

  let result = template;

  for (let [key, value] of Object.entries(buildInfo)) {
    result = result.replaceAll(`{${key}}`, value);
  }

  return result;
}

function gatherGitRepositoryInfo() {
  return {
    gitBranchName: execSync('git rev-parse --abbrev-ref HEAD').toString().trimEnd(),
    gitCommitDate: execSync('git log -1 --format=%cI').toString().trimEnd(),
    gitCommitShortHash: execSync('git rev-parse --short HEAD').toString().trimEnd(),
  };
}

function gatherBuildInfo() {
  return {
    now: new Date()
      .toISOString()
      .replaceAll('-', '')
      .replaceAll(':', '')
      .replaceAll('T', '-')
      .slice(0, 8 + 1 + 6),
    ...gatherGitRepositoryInfo(),
  };
}
