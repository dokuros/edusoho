<?php

namespace Biz\DestroyAccount\Service\Impl;

use Biz\BaseService;
use Biz\DestroyAccount\Dao\DestroyedAccountDao;
use Biz\DestroyAccount\Service\DestroyedAccountService;

class DestroyedAccountServiceImpl extends BaseService implements DestroyedAccountService
{
    public function getDestroyedAccount($id)
    {
        return $this->getRecordDao()->get($id);
    }

    public function searchDestroyedAccounts($conditions, $sort, $start, $limit, $columns = array())
    {
        $conditions = $this->filterConditions($conditions);

        return $this->getRecordDao()->search($conditions, $sort, $start, $limit, $columns);
    }

    public function countDestroyedAccounts($conditions)
    {
        $conditions = $this->filterConditions($conditions);

        return $this->getRecordDao()->count($conditions);
    }

    protected function filterConditions($conditions)
    {
        if (isset($conditions['nicknameLike'])) {
            $conditions['nicknameLike'] = strtoupper($conditions['nicknameLike']);
        }

        return $conditions;
    }

    /**
     * @return DestroyedAccountDao
     */
    protected function getRecordDao()
    {
        return $this->createDao('DestroyAccount:DestroyedAccountDao');
    }
}
