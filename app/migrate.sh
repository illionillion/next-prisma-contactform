#!/bin/sh

while true; do
  # npm run migrate コマンドを実行
  npm run migrate

  # 終了ステータスを確認
  exit_code=$?

  # 終了ステータスが 0 ならループを終了
  if [ $exit_code -eq 0 ]; then
    break
  fi

  # 終了ステータスが 0 以外なら、1 秒間待ってから再実行
  sleep 1
done
